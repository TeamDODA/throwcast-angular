var module = angular.module('tc.podcast.service', []);

module.factory('Podcast', function ($http, API_BASE) {
  var data = {};
  return {
    getAllPodcasts: function list() {
      return $http.get(API_BASE + '/api/podcasts/').then( function (res) {
        data.podcasts = res.data;
      });
    },
    play: function play(podcast) {
      return data.selected = podcast;
    },
    stop: function stop() {
      document.getElementById('audio').src = '';
      delete data.selected;
    },
    data: data
  };
});
