'use strict';

/**
 * @ngdoc overview
 * @name unionApp
 * @description
 * # unionApp
 *
 * Main module of the application.
 */
angular
  .module('unionApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])

  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
  }])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
       .when('/reps', {
        templateUrl: 'views/representatives/representatives.html',
        controller: 'RepsCtrl',
        controllerAs: 'reps'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
