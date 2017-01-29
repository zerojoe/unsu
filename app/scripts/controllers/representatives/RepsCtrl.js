'use strict';

/**
 * @ngdoc function
 * @name unionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the unionApp
 */
angular.module('unionApp')
  .controller('RepsCtrl', ['$scope', '$http', function ($scope, $http) {

	var url = 'https://spreadsheets.google.com/feeds/list/15Cm7FSQYQEsltLORHJUIMhMnlNp4iUV5Vq4inhLPXG8/od6/public/values?alt=json';

  	$scope.data = [];
  	$scope.sortType     = 'name'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchQuery  = '';     // set the default search/filter term
   
   
    var parse = function(entry) {
      var role = entry['gsx$role']['$t'];
      var electoralUnit = entry['gsx$electoralunit']['$t'];
       var firstname = entry['gsx$firstname']['$t'];
       var lastname = entry['gsx$lastname']['$t'];
       var execFunction = entry['gsx$function']['$t'];
      return {
        role: role,
        electoralUnit: electoralUnit,
        firstname : firstname,
        lastname : lastname,
        execFunction : execFunction
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
