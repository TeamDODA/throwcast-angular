var module = angular.module('tc.station.controller', [
  'tc.station.service',
  'tc.user.service',
]);

module.controller('StationController', function ($scope, Station, User) {
  $scope.defaultImage = 'http://myndset.com/wp-content/uploads/2015/10/podcast-image.jpg';
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
  $scope.subscribe = function (stationId, index) {
    $scope.user.subscriptions.push(stationId);
    User.updateSubscribtion($scope.user.subscriptions).then(function (res) {
      $scope.user.subscriptions = User.data.user.subscriptions;
      $scope.subMessage = "Subcribed to " + $scope.user.subscriptions[$scope.user.subscriptions.length - 1].title + '.';
    });
    $scope.selIndex = index;
  };
});
