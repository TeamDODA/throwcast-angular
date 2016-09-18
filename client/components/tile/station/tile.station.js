var module = angular.module('tc.tile.station', [
  'tc.favorite.service',
]);

module.controller('StationTileController', function($scope, $location, Favorite) {
  $scope.stationDetail = function stationDetail(station) {
    $location.path('/stations/' + station._id);
  };
  $scope.isFavorite = Favorite.check;
  $scope.toggleFavorite = Favorite.toggle;
});

module.component('stationTile', {
  templateUrl: 'components/tile/station/tile.station.html',
  controller: 'StationTileController',
  bindings: {
    station: '<'
  },
});
