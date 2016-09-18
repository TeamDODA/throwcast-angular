var module = angular.module('tc.home.controller', [
  'tc.favorite.service',
  'tc.playlist.service',
  'tc.podcast.service',
  'tc.station.service',
  'tc.user.service',
]);

module.controller('HomeController', function ($scope, $http, $location,
                                              API_BASE, Favorite, Playlist, Podcast, Station, User) {
  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });
  Favorite.list();

  $scope.popular = {};

  $http.get(API_BASE + '/api/podcasts/favorites').then(function (res) {
    $scope.popular.podcasts = res.data;
  });

  $http.get(API_BASE + '/api/stations/favorites').then(function (res) {
    $scope.popular.stations = res.data;
  });

  $http.get(API_BASE + '/api/playlists/favorites').then(function (res) {
    $scope.popular.playlists = res.data;
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

  $scope.play = Podcast.play;
  $scope.stop = Podcast.stop;

  $scope.stationDetail = function stationDetail(station) {
    $location.path('/stations/' + station._id);
  };

  $scope.playlistDetail = function playlistDetail(playlist) {
    $location.path('/playlists/' + playlist._id);
  };

  $scope.isPlaying = function isPlaying(podcast) {
    return Podcast.data.selected === podcast;
  };
});
