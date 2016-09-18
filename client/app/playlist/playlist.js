var module = angular.module('tc.playlist', [
  'tc.playlist.service',
  'tc.user.service',
  'tc.playlist.controller',
  'tc.playlist.detail.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/playlists', {
      templateUrl: 'app/playlist/playlist.html',
      controller: 'PlaylistController',
      authenticate: true,
      resolve: {
        user: function (User) {
          return User.getUserAsync();
        },
        playlists: function (Playlist) {
          return Playlist.list();
        },
      },
    })
    .when('/playlists/:id', {
      templateUrl: 'app/playlist/detail/playlist.detail.html',
      controller: 'PlaylistDetailController',
      authenticate: true,
      resolve: {
        user: function (User) {
          return User.getUserAsync();
        },
        playlist: function ($route, Playlist) {
          return Playlist.detail($route.current.params.id);
        },
      }
    });
});
