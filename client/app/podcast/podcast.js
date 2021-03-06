var module = angular.module('tc.podcast', [
  'tc.podcast.service',
  'tc.user.service',
  'tc.podcast.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/podcasts', {
      templateUrl: 'app/podcast/podcast.html',
      controller: 'PodcastController',
      authenticate: true,
      resolve: {
        user: function(User) {
          return User.getUserAsync();
        },
        podcasts: function(Podcast) {
          return Podcast.list().then(function() {
            return Podcast.data;
          });
        },
      }
    });
});
