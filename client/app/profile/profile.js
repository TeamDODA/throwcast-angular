angular.module('throwcast.profile', ['ngRoute'])

.config(function ($routeProvider) {
  $routeProvider
  .when('/profile', {
    templateUrl: 'app/profile/profile.html',
    controller: 'ProfileController',
    authenticate: true
  })
  .when('/profile/:id', {
    templateUrl: 'app/station/podcaststation.html',
    controller: 'StationDetailController',
    authenticate: true
  })
  .when('/playlist/:id', {
    templateUrl: 'app/playlist/playlist.html',
    controller: 'PlaylistDetailController',
    authenticate: true
  });
});
