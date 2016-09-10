var module = angular.module('tc.profile.controller', [
  'tc.playlist.service',
  'tc.user.service',
  'tc.user.playlist.service',
]);

module.controller('ProfileController', function ($scope, Playlist, UserPlaylist, User) {
  $scope.defaultImage = 'http://myndset.com/wp-content/uploads/2015/10/podcast-image.jpg';
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
    UserPlaylist.createPlaylist($scope.playlist);
  };

  $scope.deletePlaylist = function (index, playlistId) {
    UserPlaylist.deletePlaylist(index, playlistId);
  };

  $scope.unsubscribe = function (index) {
    $scope.user.subscriptions.splice(index, 1);
    User.updateSubscribtion($scope.user.subscriptions).then(function () {
      $scope.user.subscriptions = User.data.user.subscriptions;
    });
  };
});
