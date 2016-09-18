var module = angular.module('tc.station.detail.controller', [
  'tc.podcast.service',
  'tc.station.service',
  'tc.user.service',
]);

module.controller('StationDetailController', function ($scope, $routeParams, Podcast, Station, User) {
  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });
  Station.detail($routeParams.id);

  $scope.station = Station.data;
  $scope.play = Podcast.play;
  $scope.stop = Podcast.stop;
  $scope.isPlaying = function isPlaying(podcast) {
    return Podcast.data.selected === podcast;
  };
});
