var module = angular.module('tc.station.service', []);

module.factory('Station', function ($http, API_BASE) {
  var data = {};
  return {
    getStations: function () {
      return $http.get(API_BASE + '/api/stations/').then(function (res) {
        data.stations = res;
      });
    },
    getStationPodcast: function (id) {
      delete data.station;
      return $http.get(API_BASE + '/api/stations/' + id + '/').then(function (station) {
        data.selectedStationPodcasts = station.data.podcasts;
        data.station = station.data;
      });
    },
    data: data
  };
});
