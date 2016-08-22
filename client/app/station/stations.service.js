angular.module('throwcast.stations')

.factory('StationsService', function ($http) {
  var data = {};
  return {
    getStations: function () {
      return $http.get('http://localhost:8888/api/stations/').then( function (res) {
        data.stations = res;
      });
    },
    getStationPodcast: function (id) {
      return $http.get('http://localhost:8888/api/stations/' + id + '/podcasts/').then(function (stationPodcasts) {
        data.selectedStationPodcasts = stationPodcasts;
      });
    },
    data: data
  };
});
