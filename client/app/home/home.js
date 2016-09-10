var module = angular.module('tc.home', [
  'tc.home.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      authenticate: true
    });
});
