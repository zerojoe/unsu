'use strict';

/**
 * @ngdoc function
 * @name unionApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the unionApp
 */
 angular.module('unionApp')
 .controller('DiscountsCtrl', ['$scope', '$http', '$rootScope', '$location', '$window', function ($scope, $http, $rootScope, $location, $window) {

   var url = 'https://spreadsheets.google.com/feeds/list/1FQTmbM4qITpvqJnQ0M_G5fnjqYQdkwYhSy0qVGSWPi8/od6/public/values?alt=json';

   $scope.data = [];
   $scope.tempCategories = [];
   $scope.categories = [];
   $scope.today = new Date();
   $scope.sortType     = 'name'; // set the default sort type
	 $scope.sortReverse  = false;  // set the default sort order
	 $scope.searchQuery  = '';     // set the default search/filter term
   $scope.selectedEntry = $rootScope.selectedEntry;

  $scope.init = function(){
      //1. produce clean categories
      $scope.categories = $scope.tempCategories.filter(onlyUnique);
    };
    $scope.setCategory = function(category){
      $scope.searchQuery = category;
    };
    $scope.showDetails = function(entry){
      $rootScope.selectedEntry = entry;
      $location.path('discountdetails');
    };
    $scope.openAttachment = function(url){
      if(url) $window.open(url, '_blank');
    };


    var parse = function(entry) {

      var discountEntry = {
       newEntry : entry['gsx$new']['$t'],
       title : entry['gsx$title']['$t'],
       category : entry['gsx$category']['$t'],
       companyName : entry['gsx$companyname']['$t'],
       address : entry['gsx$address']['$t'],
       contact : entry['gsx$contact']['$t'],
       description : entry['gsx$description']['$t'],
       type : entry['gsx$typeofdiscount']['$t'],
       conditions : entry['gsx$conditions']['$t'],
       validFrom : entry['gsx$validfrom']['$t'],
       validUntil : entry['gsx$validuntil']['$t'],
       url : entry['gsx$link']['$t'], 
       file : entry['gsx$file']['$t']
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

