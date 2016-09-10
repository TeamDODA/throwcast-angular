function Nav() {
  return {
    templateUrl: 'components/nav/nav.html',
    controller: 'NavController'
  };
}

angular.module('throwcast.nav').directive('tcNav', Nav);
