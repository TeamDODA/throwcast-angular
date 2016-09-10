angular.module('throwcast.player', [])

.controller('PlayerController', function ($scope, PodcastService) {
  $scope.podcast = PodcastService.data;
});
