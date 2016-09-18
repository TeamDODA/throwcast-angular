var module = angular.module('tc.playlist.detail.controller', []);

module.controller('PlaylistDetailController', function ($scope, playlist) {
  $scope.playlist = playlist;
});
