var module = angular.module('tc.playlist', [
  'tc.playlist.controller',
  'tc.playlist.detail.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/playlists', {
      templateUrl: 'app/playlist/playlist.html',
      controller: 'PlaylistController',
      authenticate: true
    })
    .when('/playlists/:id', {
      templateUrl: 'app/playlist/detail/playlist.detail.html',
      controller: 'PlaylistDetailController',
      authenticate: true
    });
});
