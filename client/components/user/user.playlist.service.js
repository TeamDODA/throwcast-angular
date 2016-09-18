var module = angular.module('tc.user.playlist.service', [
  'tc.playlist.service',
  'tc.user.service',
]);

module.factory('UserPlaylist', function ($http, API_BASE, Playlist, User) {
  var data = {};
  return {
    create: function (playlist) {
      playlist.owner = User.data.user._id;
      return Playlist.create(playlist).then(function (res) {
        data.playlists.push(res.data);
      });
    },
    list: function () {
      return $http.get(API_BASE + '/api/users/playlists/').then(function (res) {
        data.playlists = res.data;
        return data;
      });
    },
    deletePlaylist: function (playlist) {
      _.pull(data.playlists, playlist);
      return $http.delete(API_BASE + '/api/playlists/' + playlist._id);
    },
    deletePodcastFromPlaylist: function (index, playlist) {
      playlist.podcasts.splice(index, 1);
      $http.put(API_BASE + '/api/playlists/' + playlist._id, playlist).then(function (res) {
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
