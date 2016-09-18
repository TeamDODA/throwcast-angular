var module = angular.module('tc.podcast.controller', []);

module.controller('PodcastController', function ($scope, podcasts) {
  $scope.podcasts = podcasts;
});
