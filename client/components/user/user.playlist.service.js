var module = angular.module('tc.user.playlist.service', [
  'tc.playlist.service',
  'tc.user.service',
]);

module.factory('UserPlaylist', function ($http, API_BASE, Playlist, User) {
  var data = {};
  return {
    createPlaylist: function (playlist) {
      data.usersPlaylist.push(playlist);
      playlist.owner = User.data.user._id;
      return Playlist.createPlaylist(playlist);
    },
    deletePlaylist: function (index, playlistId) {
      data.usersPlaylist.splice(index, 1);
      return $http.delete(API_BASE + '/api/playlists/' + playlistId);
    },
    getUserPlaylist: function () {
      return $http.get(API_BASE + '/api/users/playlists/').then(function (res) {
        data.usersPlaylist = res.data;
      });
    },
    deletePodcastFromPlaylist: function (index, playlist) {
      playlist.podcasts.splice(index, 1);
      $http.put(API_BASE + '/api/playlists/' + playlist._id, playlist).then(function (res) {
        data.specificPlaylist = res.data;
      });
    },
    data: data
  };
});
