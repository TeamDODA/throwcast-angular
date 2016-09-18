var module = angular.module('tc.tile.podcast', [
  'tc.favorite.service',
  'tc.podcast.service',
]);

module.controller('PodcastTileController', function($scope, Favorite, Podcast) {
  $scope.play = Podcast.play;
  $scope.stop = Podcast.stop;
  $scope.isPlaying = function isPlaying(podcast) {
    return Podcast.data.selected === podcast;
  };
  $scope.isFavorite = Favorite.check;
  $scope.toggleFavorite = Favorite.toggle;
});

module.component('podcastTile', {
  templateUrl: 'components/tile/podcast/tile.podcast.html',
  controller: 'PodcastTileController',
  bindings: {
    podcast: '<'
  },
});
