'use strict';

/**
 * @ngdoc function
 * @name unionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the unionApp
 */
 angular.module('unionApp')
 .controller('DecisionsCtrl', ['$scope', '$http', function ($scope, $http) {

   var url = 'https://spreadsheets.google.com/feeds/list/1OH4Q6TS1PE5fw8nDgA8NJAeLVAyaCQyG7UX4nkZdoDE/od6/public/values?alt=json';

   $scope.data = [];
   $scope.sortType     = 'name'; // set the default sort type
	 $scope.sortReverse  = false;  // set the default sort order
	 $scope.searchQuery  = '';     // set the default search/filter term


  var parse = function(entry) {
    console.log('decisions', entry);
    return {
        id : entry['gsx$id']['$t'],
        status : entry['gsx$status']['$t'],
        proposedOn : entry['gsx$proposedon']['$t'],
        proposedBy : entry['gsx$proposedby']['$t'],
        category : entry['gsx$category']['$t'],
        title : entry['gsx$title']['$t'],
        description : entry['gsx$description']['$t'],
        acceptedByCouncil : entry['gsx$acceptedbycouncil']['$t'],
        acceptedVia : entry['gsx$via']['$t'],
        assignedTo : entry['gsx$assignedto']['$t'],
        reportBackBy : entry['gsx$reportbackby']['$t'],
        finance : {
          financialImplications : entry['gsx$financialimplications']['$t'],
          amount : entry['gsx$amount']['$t'],
          currency : entry['gsx$currency']['$t'],
          paymentProcessedOn : entry['gsx$paymentprocessedon']['$t'],
        }
    };
  }

  $http.get(url)
  .then(function(response) {
    var entries = response.data.feed.entry;

    for (var key in entries) {
      var content = entries[key];
      $scope.data.push(parse(content));
    }
  });



}]);
