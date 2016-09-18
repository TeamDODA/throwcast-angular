var module = angular.module('tc.station', [
  'tc.station.service',
  'tc.user.service',
  'tc.station.controller',
  'tc.station.detail.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/stations', {
      templateUrl: 'app/station/station.html',
      controller: 'StationController',
      authenticate: true,
      resolve: {
        user: function(User) {
          return User.getUserAsync();
        },
        stations: function(Station) {
          return Station.list();
        },
      }
    })
    .when('/stations/:id', {
      templateUrl: 'app/station/detail/station.detail.html',
      controller: 'StationDetailController',
      authenticate: true,
      resolve: {
        user: function(User) {
          return User.getUserAsync();
        },
        station: function($route, Station) {
          return Station.detail($route.current.params.id);
        },
      }
    });
});
