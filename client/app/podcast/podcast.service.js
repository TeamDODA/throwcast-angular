angular.module('throwcast.podcast')

.factory('PodcastService', function ($http, API_BASE) {
  var data = {};
  return {
    getAllPodcasts: function () {
      return $http.get(API_BASE + '/api/podcasts/').then( function (res) {
        data.podcasts = res.data;
      });
    },
    play: function (podcast) {
      return data.selected = podcast;
    },
    data: data
  };
});
