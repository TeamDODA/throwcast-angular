var module = angular.module('tc.playlist.controller', [
  'tc.playlist.service',
]);

module.controller('PlaylistController', function ($scope, $location, Playlist) {
  Playlist.getAllPlaylist().then(function () {
    $scope.allPlaylist = Playlist.data.allPlaylist;
  });

  $scope.getSpecificPlaylist = function (playlistId) {
    Playlist.getSpecificPlaylist(playlistId).then(function () {
      $scope.specificPlaylist = Playlist.data.specificPlaylist;
    });
  };

  $scope.playlistDetail = function playlistDetail(playlist) {
    $location.path('/playlists/' + playlist._id);
  };
});
