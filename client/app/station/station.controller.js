var module = angular.module('tc.station.controller', [
  'tc.station.service',
  'tc.user.service',
]);

module.controller('StationController', function ($scope, $location, Station, User) {
  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });

  Station.getStations().then(function () {
    $scope.stations = Station.data.stations.data;
  });

  $scope.getStationPodcast = function (id) {
    Station.getStationPodcast(id).then(function () {
      $scope.selectedStationPodcasts = Station.data.selectedStationPodcasts.data;
      $scope.selected = Station.data.selected;
    });
  };

  $scope.stationDetail = function stationDetail(station) {
    $location.path('/stations/' + station._id);
  };
});
