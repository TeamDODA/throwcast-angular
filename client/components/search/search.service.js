function SearchService($http, API_BASE) {
  function searchService() {
  }

  searchService.prototype.searchPlaylists = function(searchQuery) {
    return $http.post(API_BASE + '/api/playlists/search', { query: searchQuery })
      .then(function(res) {
        this.playlists = res.data.hits.hits;
      }.bind(this));
  };

  searchService.prototype.searchPodcasts = function(searchQuery) {
    return $http.post(API_BASE + '/api/podcasts/search', { query: searchQuery })
      .then(function(res) {
        this.podcasts = res.data.hits.hits;
      }.bind(this));
  };

  searchService.prototype.searchStations = function(searchQuery) {
    return $http.post(API_BASE + '/api/stations/search', { query: searchQuery })
      .then(function(res) {
        this.stations = res.data.hits.hits;
      }.bind(this));
  };

  return new searchService();
}

angular.module('throwcast.search').factory('SearchService', SearchService);
