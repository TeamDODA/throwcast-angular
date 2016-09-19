var module = angular.module('tc.player.controller', [
  'tc.player.service',
]);

module.controller('PlayerController', function PlayerController($scope, Player) {
  $scope.player = Player.data;
});
