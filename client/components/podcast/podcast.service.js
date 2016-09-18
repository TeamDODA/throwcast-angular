var module = angular.module('tc.podcast.service', []);

module.factory('Podcast', function ($http, API_BASE) {
  var data = {};
  return {
    list: function list() {
      return $http.get(API_BASE + '/api/podcasts/').then(function (res) {
        data.podcasts = res.data;
      });
    },
    popular: function() {
      return $http.get(API_BASE + '/api/podcasts/favorites');
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
