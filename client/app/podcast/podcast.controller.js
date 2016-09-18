var module = angular.module('tc.podcast.controller', [
  'tc.favorite.service',
  'tc.podcast.service',
  'tc.user.service',
]);

module.controller('PodcastController', function ($scope, Favorite, Podcast, User) {
  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });
  Favorite.list();
  Podcast.list();

  $scope.podcasts = Podcast.data;

  $scope.play = Podcast.play;
  $scope.stop = Podcast.stop;
  $scope.isPlaying = function isPlaying(podcast) {
    return Podcast.data.selected === podcast;
  };
  $scope.isFavorite = Favorite.check;
  $scope.toggleFavorite = Favorite.toggle;
});
