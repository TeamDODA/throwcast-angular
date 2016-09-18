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

  Playlist.detail($routeParams.id).then(function () {
    $scope.playlist = Playlist.data.selected;
  });

  $scope.delete = function (podcast) {
    _.pull($scope.playlist, podcast);
    UserPlaylist.delete(podcast, $scope.playlist);
  };

  $scope.play = function (link) {
    $scope.podcastLink = Podcast.play(link);
  };
});
