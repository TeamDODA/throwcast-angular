var module = angular.module('tc.player.service', []);

module.factory('Player', function () {
  var data = {};
  return {
    play: function play(podcast) {
      return data.selected = podcast;
    },
    stop: function stop() {
      document.getElementById('audio').src = '';
      delete data.selected;
    },
    isSelected: function isSelected(podcast) {
      return data.selected === podcast;
    },
    data: data
  };
});
