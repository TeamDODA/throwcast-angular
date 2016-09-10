function NavController($scope, userService, authService, SearchService, $location) {
  userService.getUserAsync().then(function (user) {
    $scope.user = user;
  });

  $scope.logout = function () {
    authService.logout();
  };

  $scope.getSearchResults = function () {
    SearchService.searchPodcasts($scope.searchQuery);
    SearchService.searchPlaylists($scope.searchQuery);
    SearchService.searchStations($scope.searchQuery);
    $location.path('/results');
    $scope.searchQuery = '';
  };
}

angular.module('throwcast.nav').controller('NavController', NavController);
