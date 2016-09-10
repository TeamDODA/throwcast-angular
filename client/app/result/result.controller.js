var module = angular.module('tc.result.controller', [
  'tc.search.service',
]);

module.controller('ResultController', function ($scope, Search) {
  $scope.results = Search;
});
