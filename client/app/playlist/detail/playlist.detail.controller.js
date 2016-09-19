var module = angular.module('tc.playlist.detail.controller', []);

module.controller('PlaylistDetailController', function ($scope, UserPlaylist, playlist, user) {
  $scope.playlist = playlist;
  $scope.isPlaylistOwner = playlist.owner === user._id;
  $scope.removeFromPlaylist = function removeFromPlaylist(podcast) {
    if ($scope.isPlaylistOwner) {
      UserPlaylist.removePodcastFromPlaylist($scope.playlist, podcast);
    }
  }
});
