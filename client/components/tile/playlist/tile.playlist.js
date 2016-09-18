var module = angular.module('tc.tile.playlist', [
  'tc.favorite.service',
  'tc.user.playlist.service',
]);

module.controller('PlaylistTileController', function($scope, $location, Favorite, UserPlaylist) {
  $scope.playlistDetail = function playlistDetail(playlist) {
    $location.path('/playlists/' + playlist._id);
  };
  $scope.isFavorite = Favorite.check;
  $scope.toggleFavorite = Favorite.toggle;
  $scope.isOwner = UserPlaylist.isOwner;
  $scope.deletePlaylist = UserPlaylist.deletePlaylist;
});

module.component('playlistTile', {
  templateUrl: 'components/tile/playlist/tile.playlist.html',
  controller: 'PlaylistTileController',
  bindings: {
    playlist: '<'
  },
});
