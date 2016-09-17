var module = angular.module('tc.home.controller', [
  'tc.playlist.service',
  'tc.podcast.service',
  'tc.station.service',
  'tc.user.service',
]);

module.controller('HomeController', function ($scope, $http, $location, API_BASE, Playlist, Podcast, Station, User) {
  User.getUserAsync().then(function (user) {
    $scope.user = user;
  });

  Podcast.getAllPodcasts().then(function () {
    $scope.podcasts = Podcast.data.podcasts;
  });

  Station.getStations().then(function () {
    $scope.stations = Station.data.stations.data;
  });

  $scope.getStationPodcast = function (station, index) {
    Station.getStationPodcast(station, index).then(function () {
      $scope.selectedStationPodcasts = Station.data.selectedStationPodcasts;
      $scope.selected = Station.data.selected;
    });
  };

  Playlist.getAllPlaylist().then(function (res) {
    $scope.playlists = Playlist.data.allPlaylist;
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

  $scope.getPopularPodcast = function () {
    $http.get(API_BASE + '/api/podcasts/popular').then(function (res) {
      $scope.popularPodcasts = res.data.data;
    });
  };

  $scope.getPopularStations = function () {
    $http.get(API_BASE + '/api/stations/popular').then(function (res) {
      $scope.popularStations = res.data.data;
    });
  };

  $scope.stationDetail = function stationDetail(station) {
    $location.path('/stations/' + station._id);
  };

  $scope.playlistDetail = function playlistDetail(playlist) {
    $location.path('/playlists/' + playlist._id);
  }
});
