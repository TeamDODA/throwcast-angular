var module = angular.module('tc.nav.controller', [
  'tc.auth.service',
  'tc.search.service',
  'tc.user.service',
]);

module.controller('NavController', function NavController($scope, $location, Auth, Search, User) {
  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });

  $scope.logout = function () {
    Auth.logout();
    $location.path('/');
  };

  $scope.getSearchResults = function () {
    Search.searchPodcasts($scope.searchQuery);
    Search.searchPlaylists($scope.searchQuery);
    Search.searchStations($scope.searchQuery);
    $location.path('/results');
    $scope.searchQuery = '';
  };

  $scope.isActive = function isActive(path) {
    return path === $location.path();
  };
});
