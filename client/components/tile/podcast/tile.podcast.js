var module = angular.module('tc.tile.podcast', [
  'tc.favorite.service',
  'tc.player.service',
  'tc.user.playlist.service',
]);

module.controller('PodcastTileController', function($scope, Favorite, Player, UserPlaylist) {
  var ctrl = this;
  UserPlaylist.list().then(function(data) {
    $scope.userPlaylists = data;
  });
  $scope.play = Player.play;
  $scope.stop = Player.stop;
  $scope.isSelected = Player.isSelected;
  $scope.isFavorite = Favorite.check;
  $scope.toggleFavorite = Favorite.toggle;
  $scope.isDialogOpen = UserPlaylist.isSelectedPodcast;
  $scope.toggleDialog = UserPlaylist.selectPodcast;

  $scope.createPlaylist = function () {
    if ($scope.title) {
      UserPlaylist.create({ title: $scope.title });
      delete $scope.title;
    }
  };
  $scope.hasPodcast = function hasPodcast(playlist, podcast) {
    return _.includes(playlist.podcasts, podcast._id);
  };
  $scope.updatePlaylist = UserPlaylist.updatePlaylist;
  ctrl.remove = function() {
    ctrl.onRemove({podcast: ctrl.podcast});
  };
});

module.component('podcastTile', {
  templateUrl: 'components/tile/podcast/tile.podcast.html',
  controller: 'PodcastTileController',
  bindings: {
    podcast: '<',
    showRemove: '<',
    onRemove: '&',
  },
});
