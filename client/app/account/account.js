var module = angular.module('tc.account', [
  'tc.account.controller',
  'ngRoute'
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/account/sign-in.html',
      controller: 'AccountController'
    })
    .when('/signup', {
      templateUrl: 'app/account/sign-up.html',
      controller: 'AccountController'
    });
});
