var module = angular.module('tc.playlist.detail.controller', [
  'tc.playlist.service',
  'tc.podcast.service',
  'tc.user.service',
  'tc.user.playlist.service',
  'ngRoute',
]);

module.controller('PlaylistDetailController', function ($scope, $routeParams, Playlist, Podcast, User, UserPlaylist) {
  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });

  Playlist.getSpecificPlaylist($routeParams.id).then(function () {
    $scope.playlist = Playlist.data.specificPlaylist;
  });
  $scope.deletePodcastFromPlaylist = function (index, playlist) {
    UserPlaylist.deletePodcastFromPlaylist(index, playlist);
  };

  $scope.play = function (link) {
    $scope.podcastLink = Podcast.play(link);
  };
});
