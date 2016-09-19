var module = angular.module('tc.user.service', [
  'tc.favorite.service',
]);

module.factory('User', function ($http, $q, API_BASE, Favorite) {
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
          })
          .then(Favorite.list)
          .then(function () {
            return data.user;
          });
      }
    },
    data: data,
  };
});
