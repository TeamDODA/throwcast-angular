angular.module('throwcast.auth')

.factory('userService', function ($http, $q, API_BASE) {
  var data = {};
  return {
    createUser: function (userCredentials) {
      return $http.post(API_BASE + '/api/users/', userCredentials);
    },
    getUserAsync: function () {
      if (data.user) {
        return $q.resolve(data.user);
      } else {
        return $http.get(API_BASE + '/api/users/me')
        .then(function (res) {
          data.user = res.data;
          return res.data;
        });
      }
    },
    updateSubscribtion: function (subscriptions) {
      return $http.put(API_BASE + '/api/users/subscriptions/', subscriptions).then(function (res) {
        data.user.subscriptions = res.data.subscriptions;
      });
    },
    data: data,
  };
});
