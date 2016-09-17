var module = angular.module('tc.profile.controller', [
  'tc.playlist.service',
  'tc.user.service',
  'tc.user.playlist.service',
]);

module.controller('ProfileController', function ($scope, $location, Playlist, UserPlaylist, User) {
  $scope.data = Playlist.data;
  $scope.playlist = {};
  $scope.UserPlaylist = UserPlaylist.data;

  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });
  Playlist.getAllPlaylist();

  UserPlaylist.getUserPlaylist();

  $scope.getSpecificPlaylist = function (playlistId) {
    Playlist.getSpecificPlaylist(playlistId).then(function () {
      $scope.specificPlaylist = Playlist.data.specificPlaylist;
    });
  };

  $scope.createPlaylist = function () {
    if ($scope.playlist.title) {
      UserPlaylist.createPlaylist({ title: $scope.playlist.title });
      delete $scope.playlist.title;
    }
  };

  $scope.deletePlaylist = function (index, playlistId) {
    UserPlaylist.deletePlaylist(index, playlistId);
  };

  $scope.playlistDetail = function playlistDetail(playlist) {
    $location.path('/playlists/' + playlist._id);
  };
});
