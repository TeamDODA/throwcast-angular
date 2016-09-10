var module = angular.module('tc.player.controller', [
  'tc.podcast.service',
]);

module.controller('PlayerController', function PlayerController($scope, Podcast) {
  $scope.podcast = Podcast.data;
});
