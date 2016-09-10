'use strict';

var app = angular.module('throwcast', [
  'tc.account',
  'tc.auth',
  'tc.constants',
  'tc.home',
  'tc.nav',
  'tc.player.controller',
  'tc.playlist',
  'tc.podcast',
  'tc.profile',
  'tc.result',
  'tc.station',
  'ngRoute'
]);

app.config(function($routeProvider, $sceProvider) {
  $routeProvider.otherwise({
    redirectTo: '/signin'
  });
  $sceProvider.enabled(false);
});

app.run(function($rootScope, $location, Auth) {
  $rootScope.$on('$routeChangeStart', function(evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      evt.preventDefault();
      $location.path('/signin');
    }
  });
});
