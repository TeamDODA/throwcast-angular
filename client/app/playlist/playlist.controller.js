var module = angular.module('tc.playlist.controller', []);

module.controller('PlaylistController', function ($scope, playlists) {
  $scope.playlists = playlists;
});
