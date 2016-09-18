var module = angular.module('tc.playlist.service', []);

module.factory('Playlist', function ($http, API_BASE) {
  var data = {};
  return {
    create: function (playlist) {
      return $http.post(API_BASE + '/api/playlists/', playlist);
    },
    list: function () {
      return $http.get(API_BASE + '/api/playlists/').then(function (res) {
        data.playlists = res.data;
        return data.playlists;
      });
    },
    popular: function() {
      return $http.get(API_BASE + '/api/playlists/favorites');
    },
    detail: function (playlistId) {
      return $http.get(API_BASE + '/api/playlists/' + playlistId).then(function (res) {
        data.selected = res.data;
        return data.selected;
      });
    },
    data: data,
  };
});
