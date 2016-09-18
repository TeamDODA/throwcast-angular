var module = angular.module('tc.playlist.controller', [
  'tc.playlist.service',
]);

module.controller('PlaylistController', function ($scope, $location, Playlist) {
  Playlist.list().then(function () {
    $scope.playlists = Playlist.data.playlists;
  });

  $scope.playlistDetail = function playlistDetail(playlist) {
    $location.path('/playlists/' + playlist._id);
  };
});
