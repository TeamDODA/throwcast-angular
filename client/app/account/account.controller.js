var module = angular.module('tc.account.controller', [
  'tc.auth',
]);

module.controller('AccountController', function ($scope, $location, $window, Auth) {
  $scope.userCredentials = { username: '', password: '' };
  $scope.signUp = function () {
    Auth.signUp($scope.userCredentials)
      .then(function () {
        $location.path('/');
        $window.location.reload();
      })
      .catch(function (err) {
        $scope.error = 'Error: ' + err;
      });
  };
  $scope.signIn = function () {
    Auth.signIn($scope.userCredentials)
      .then(function () {
        $location.path('/');
        $window.location.reload();
      })
      .catch(function (err) {
        $scope.error = 'Error: ' + err;
      });
  };
});
