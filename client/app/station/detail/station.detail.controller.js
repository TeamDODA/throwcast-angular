var module = angular.module('tc.station.detail.controller', [
  'tc.playlist.service',
  'tc.podcast.service',
  'tc.station.service',
  'tc.user.service',
]);

module.controller('StationDetailController', function ($scope, $routeParams, Playlist, Podcast, Station, User) {
  $scope.defaultImage = 'http://myndset.com/wp-content/uploads/2015/10/podcast-image.jpg';
  $scope.selected = Station.data;
  Station.getStationPodcast($routeParams.id);

  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });

  Playlist.getAllPlaylist().then(function (res) {
    $scope.allPlaylist = Playlist.data.allPlaylist;
  });

  $scope.getUserPlaylist = function (user, playlist, index) {
    $scope.userPlaylists = [];
    angular.forEach(playlist, function (eachPlaylist) {
      if (user._id === eachPlaylist.owner) {
        $scope.userPlaylists.push(eachPlaylist);
      }
    });
    $scope.selectedIndex = index;
    return $scope.userPlaylists;
  };

  $scope.addPodcastToPlaylist = function (podcast, selectedPlaylist) {
    selectedPlaylist.podcasts.push(podcast);
    Playlist.updatePlaylist(selectedPlaylist._id, selectedPlaylist).then(function () {
      $scope.specificPlaylist = Playlist.data.specificPlaylist;
      $scope.message = "Added " + podcast.title + ' to ' + $scope.specificPlaylist.title + ".";
    });
  };

  $scope.play = function (link) {
    $scope.podcastLink = Podcast.play(link);
  };
});
