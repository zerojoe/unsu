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
  $scope.sortType     = 'lastname'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.searchQuery  = '';     // set the default search/filter term
  $scope.tempUnits = [];
  $scope.electoralUnits = [];

  $scope.init = function(){
    //produce unique list of electoral units
    $scope.electoralUnits = $scope.tempUnits.filter(onlyUnique);
  };

  $scope.setElectoralUnit = function(eUnit){
   $scope.searchQuery = eUnit;
 };

 var parse = function(entry) {

  var e = {
   role : entry['gsx$role']['$t'],
   electoralUnit : entry['gsx$electoralunit']['$t'],
   firstname : entry['gsx$firstname']['$t'],
   lastname : entry['gsx$lastname']['$t'],
   execFunction : entry['gsx$function']['$t']
 }

 if (e.electoralUnit){
  $scope.tempUnits.push(e.electoralUnit);
};

return e;
}

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
