var module = angular.module('tc.user.playlist.service', [
  'tc.playlist.service',
  'tc.user.service',
]);

module.factory('UserPlaylist', function ($http, $q, API_BASE, Playlist, User) {
  var data = {};
  var promise;

  function isOwner(playlist) {
    return playlist.owner === User.data.user._id;
  }

  function removePodcastFromPlaylist(playlist, podcast) {
    _.pullAllBy(playlist.podcasts, [podcast], '_id');
    $http.put(API_BASE + '/api/playlists/' + playlist._id, playlist).then(function (res) {
      data.specificPlaylist = res.data;
    });
  }

  return {
    create: function (playlist) {
      playlist.owner = User.data.user._id;
      return Playlist.create(playlist).then(function (res) {
        data.playlists.push(res.data);
      });
    },
    list: function () {
      if (data.playlists) {
        return $q.resolve(data);
      }
      if (!promise) {
        promise = $http.get(API_BASE + '/api/users/playlists/').then(function (res) {
          data.playlists = res.data;
          return data;
        });
      }
      return promise;
    },
    isSelectedPodcast: function isSelectedPodcast(podcast) {
      return data.selected === podcast;
    },
    selectPodcast: function selectPodcast(podcast) {
      if (podcast) {
        data.selected = podcast;
      } else {
        delete data.selected;
      }
    },
    isOwner: isOwner,
    deletePlaylist: function (playlist) {
      if (isOwner(playlist)) {
        _.pull(data.playlists, playlist);
        _.pull(Playlist.data.playlists, playlist);
        return $http.delete(API_BASE + '/api/playlists/' + playlist._id);
      }
    },
    removePodcastFromPlaylist: removePodcastFromPlaylist,
    updatePlaylist: function (playlist, target) {
      if (_.includes(playlist.podcasts, target._id)) {
        _.pull(playlist.podcasts, target._id);
      } else {
        playlist.podcasts.push(target._id);
      }
      return $http.put(API_BASE + '/api/playlists/' + playlist._id, playlist);
    },
    data: data
  };
});
