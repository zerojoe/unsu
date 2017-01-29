'use strict';

/**
 * @ngdoc function
 * @name unionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the unionApp
 */
 angular.module('unionApp')
 .controller('DiscountsCtrl', ['$scope', '$http', function ($scope, $http) {

   var url = 'https://spreadsheets.google.com/feeds/list/1FQTmbM4qITpvqJnQ0M_G5fnjqYQdkwYhSy0qVGSWPi8/od6/public/values?alt=json';

   $scope.data = [];
   $scope.tempCategories = [];
   $scope.categories = [];
   $scope.today = new Date();
   $scope.sortType     = 'name'; // set the default sort type
	 $scope.sortReverse  = false;  // set the default sort order
	 $scope.searchQuery  = '';     // set the default search/filter term

  $scope.init = function(){
      //1. produce clean categories
      $scope.categories = $scope.tempCategories.filter(onlyUnique);
    };
    $scope.setCategory = function(category){
      $scope.searchQuery = category;
    }


    var parse = function(entry) {

      var discountEntry = {
       newEntry : entry['gsx$new']['$t'],
       title : entry['gsx$title']['$t'],
       category : entry['gsx$category']['$t'],
       companyName : entry['gsx$companyname']['$t'],
       description : entry['gsx$description']['$t'],
       type : entry['gsx$typeofdiscount']['$t'],
       conditions : entry['gsx$conditions']['$t'],
       validFrom : entry['gsx$validfrom']['$t'],
       validUntil : entry['gsx$validuntil']['$t'],
       url : entry['gsx$link']['$t']
     }

     if(discountEntry.category) {
      $scope.tempCategories.push(discountEntry.category);
    };

    return discountEntry;
  };

  $http.get(url)
  .then(function(response) {
    var entries = response.data.feed.entry;

    for (var key in entries) {
      var content = entries[key];
      $scope.data.push(parse(content));
    }
    $scope.init();
  });
}]);

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}