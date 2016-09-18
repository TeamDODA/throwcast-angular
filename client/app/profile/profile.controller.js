var module = angular.module('tc.profile.controller', [
  'tc.favorite.service',
  'tc.podcast.service',
  'tc.playlist.service',
  'tc.user.service',
  'tc.user.playlist.service',
]);

module.controller('ProfileController', function ($scope, $location, Favorite, Podcast, Playlist, UserPlaylist, User) {
  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });
  UserPlaylist.list();
  Favorite.list();

  $scope.favorite = Favorite.data;
  $scope.userPlaylists = UserPlaylist.data;

  $scope.createPlaylist = function () {
    if ($scope.playlist.title) {
      UserPlaylist.create({ title: $scope.playlist.title });
      delete $scope.playlist.title;
    }
  };

  $scope.playlistDetail = function playlistDetail(playlist) {
    $location.path('/playlists/' + playlist._id);
  };

  $scope.play = Podcast.play;
  $scope.stop = Podcast.stop;

  $scope.deletePlaylist = UserPlaylist.deletePlaylist;
});
