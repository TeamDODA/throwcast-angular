var module = angular.module('tc.search.service', []);

module.factory('Search', function Search($http, API_BASE) {
  function Search() {
  }

  Search.prototype.searchPlaylists = function (searchQuery) {
    return $http.post(API_BASE + '/api/playlists/search', { query: searchQuery })
      .then(function (res) {
        this.playlists = res.data.hits.hits;
      }.bind(this));
  };

  Search.prototype.searchPodcasts = function (searchQuery) {
    return $http.post(API_BASE + '/api/podcasts/search', { query: searchQuery })
      .then(function (res) {
        this.podcasts = res.data.hits.hits;
      }.bind(this));
  };

  Search.prototype.searchStations = function (searchQuery) {
    return $http.post(API_BASE + '/api/stations/search', { query: searchQuery })
      .then(function (res) {
        this.stations = res.data.hits.hits;
      }.bind(this));
  };

  return new Search();
});
