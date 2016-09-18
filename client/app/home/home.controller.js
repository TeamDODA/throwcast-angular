var module = angular.module('tc.home.controller', []);

module.controller('HomeController', function ($scope, $location, playlists, podcasts, stations) {
  $scope.popular = {
    playlists: playlists,
    podcasts: podcasts,
    stations: stations,
  };
});
