var module = angular.module('tc.podcast', [
  'tc.podcast.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/podcasts', {
      templateUrl: 'app/podcast/podcast.html',
      controller: 'PodcastController',
      authenticate: true
    });
});
