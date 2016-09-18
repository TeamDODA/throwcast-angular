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
  'tc.tile',
  'ngRoute'
]);

app.config(function($routeProvider, $locationProvider, $sceProvider) {
  $routeProvider.otherwise({
    redirectTo: '/signin'
  });

  $locationProvider.html5Mode(true);
  $sceProvider.enabled(false);
});

app.run(function($rootScope, $location, $window, Auth) {
  $rootScope.$on('$routeChangeStart', function(evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      evt.preventDefault();
      $location.path('/signin');
    }
  });
  $rootScope._ = $window._;
});
