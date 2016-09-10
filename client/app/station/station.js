var module = angular.module('tc.station', [
  'tc.station.controller',
  'tc.station.detail.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/stations', {
      templateUrl: 'app/station/station.html',
      controller: 'StationController',
      authenticate: true
    })
    .when('/stations/:id', {
      templateUrl: 'app/station/detail/station.detail.html',
      controller: 'StationDetailController',
      authenticate: true
    });
});
