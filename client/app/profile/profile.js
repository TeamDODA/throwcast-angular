var module = angular.module('tc.profile', [
  'tc.favorite.service',
  'tc.user.service',
  'tc.user.playlist.service',
  'tc.profile.controller',
  'ngRoute',
]);

module.config(function ($routeProvider) {
  $routeProvider
    .when('/profile', {
      templateUrl: 'app/profile/profile.html',
      controller: 'ProfileController',
      authenticate: true,
      resolve: {
        user: function(User) {
          return User.getUserAsync();
        },
        userPlaylists: function(UserPlaylist) {
          return UserPlaylist.list();
        },
        favorite: function(Favorite) {
          return Favorite.data;
        },
      }
    });
});
