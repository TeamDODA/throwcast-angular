var module = angular.module('tc.home.controller', []);

module.controller('HomeController', function ($scope, $http, $location, playlists, podcasts, stations) {
  $scope.popular = {
    playlists: playlists,
    podcasts: podcasts,
    stations: stations,
  };

  $scope.stationDetail = function stationDetail(station) {
    $location.path('/stations/' + station._id);
  };

  $scope.playlistDetail = function playlistDetail(playlist) {
    $location.path('/playlists/' + playlist._id);
  };
});
