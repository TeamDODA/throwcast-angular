var module = angular.module('tc.home', [
  'tc.playlist.service',
  'tc.podcast.service',
  'tc.station.service',
  'tc.home.controller',
  'tc.user.service',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/home/home.html',
      controller: 'HomeController',
      authenticate: true,
      resolve: {
        user: function(User) {
          return User.getUserAsync();
        },
        playlists: function(Playlist) {
          return Playlist.popular().then(function(res) {
            return res.data;
          });
        },
        podcasts: function(Podcast) {
          return Podcast.popular().then(function(res) {
            return res.data;
          });
        },
        stations: function(Station) {
          return Station.popular().then(function(res) {
            return res.data;
          });
        },
      },
    });
});
