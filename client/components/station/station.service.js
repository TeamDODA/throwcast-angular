var module = angular.module('tc.station.service', []);

module.factory('Station', function ($http, API_BASE) {
  var data = {};
  return {
    list: function () {
      return $http.get(API_BASE + '/api/stations/').then(function (res) {
        data.stations = res.data;
        return data.stations;
      });
    },
    popular: function() {
      return $http.get(API_BASE + '/api/stations/favorites');
    },
    detail: function (id) {
      return $http.get(API_BASE + '/api/stations/' + id).then(function (res) {
        data.selected = res.data;
        return data.selected;
      });
    },
    data: data
  };
});
