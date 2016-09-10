var module = angular.module('tc.profile', [
  'tc.profile.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/profile', {
      templateUrl: 'app/profile/profile.html',
      controller: 'ProfileController',
      authenticate: true
    });
});
