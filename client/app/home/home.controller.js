var module = angular.module('tc.home.controller', [
  'tc.playlist.service',
  'tc.podcast.service',
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

  $scope.subscribe = function (stationId, index) {
    $scope.user.subscriptions.push(stationId);
    User.updateSubscribtion($scope.user.subscriptions).then(function (res) {
      $scope.user.subscriptions = User.data.user.subscriptions;
      $scope.subMessage = "Subcribed to " + $scope.user.subscriptions[$scope.user.subscriptions.length - 1].title + '.';
    });
    $scope.selIndex = index;
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

  $scope.addToQueue = function (userId, podcastId) {
    $http.post(API_BASE + '/api/user/' + userId + '/queue/', { podcastId: podcastId }).then(function (res) {
      $scope.message = $scope.podcasts.name + ' has been added to your queue.';
      $scope.getPodcast();
    });
  };

  $scope.addPodToPlaylist = function (playlistId, podcastId) {
    $http.post(API_BASE + '/api/playlist/' + playlistId + '/podcast/', { podcastId: podcastId }).then(function (res) {
      $scope.message = $scope.podcasts.name + ' has been added to ' + res.data.name + '.';
      $scope.getPodcast();
    });
  };

  $scope.stationDetail = function stationDetail(station) {
    $location.path('/stations/' + station._id);
  }

  $scope.playlistDetail = function playlistDetail(playlist) {
    $location.path('/playlist/' + playlist._id);
  }
});
