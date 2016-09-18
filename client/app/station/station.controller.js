var module = angular.module('tc.station.controller', [
  'tc.station.service',
  'tc.user.service',
]);

module.controller('StationController', function ($scope, stations) {
  $scope.stations = stations;
});
