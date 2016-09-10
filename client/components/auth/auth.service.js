angular.module('throwcast.auth')

.factory('authService', function ($http, $window, $location, userService, API_BASE) {
  return {
    signUp: function (userCredentials) {
      return userService.createUser(userCredentials)
      .then(function (res) {
        $window.localStorage.token = res.data.token;
      })
      .catch(function (err) {
        delete $window.localStorage.token;
        throw err;
      });
    },
    signIn: function (userCredentials) {
      return $http.post(API_BASE + '/auth/local/', userCredentials)
      .then(function (res) {
        $window.localStorage.token = res.data.token;
      })
      .catch(function (err) {
        delete $window.localStorage.token;
        throw err;
      });
    },
    logout: function () {
      delete $window.localStorage.token;
      $location.path('/signin');
      $window.location.reload();
    },
    isAuth: function () {
      return !!$window.localStorage.token;
    }
  };
});
