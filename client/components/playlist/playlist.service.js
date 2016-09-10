var module = angular.module('tc.playlist.service', []);

module.factory('Playlist', function ($http, API_BASE) {
  var data = {};
  return {
    createPlaylist: function (playlist) {
      return $http.post(API_BASE + '/api/playlists/', playlist)
        .then(function (res) {
          data.allPlaylist.push(res.data);
        });
    },
    getAllPlaylist: function () {
      return $http.get(API_BASE + '/api/playlists/').then(function (res) {
        data.allPlaylist = res.data;
      });
    },
    getSpecificPlaylist: function (playlistId) {
      return $http.get(API_BASE + '/api/playlists/' + playlistId).then(function (res) {
        data.specificPlaylist = res.data;
      });
    },
    updatePlaylist: function (playlistId, playlist) {
      return $http.put(API_BASE + '/api/playlists/' + playlistId, playlist).then(function (res) {
        data.specificPlaylist = res.data;
      });
    },
    data: data
  };
});
