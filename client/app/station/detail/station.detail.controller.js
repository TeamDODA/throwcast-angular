var module = angular.module('tc.station.detail.controller', []);

module.controller('StationDetailController', function ($scope, station) {
  $scope.station = station;
});
