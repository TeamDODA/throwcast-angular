var module = angular.module('tc.auth.interceptor', []);

module.factory('authInterceptor', function ($q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
      }
      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        $location.path('/signin');
      }
      return $q.reject(rejection);
    }
  };
});

module.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
