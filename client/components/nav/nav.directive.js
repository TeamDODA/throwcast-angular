var module = angular.module('tc.nav.directive', [
  'tc.nav.controller',
]);

module.directive('tcNav', function Nav() {
  return {
    templateUrl: 'components/nav/nav.html',
    controller: 'NavController'
  };
});
