var module = angular.module('tc.result', [
  'tc.result.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider.when('/results', {
    templateUrl: 'app/result/result.html',
    controller: 'ResultController',
    authenticate: true
  });
});
