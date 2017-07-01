'use strict';

var app = app||{};

(function(module) {

  function Player(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }

  Player.all = [];

  Player.process = function(data) {
    Player.all = data.forEach(val => new Player(val))
  };

  Player.fetch = function() {
    $.get('/trades')
    .then(data => {
      Player.process(data);
    });
  };


  module.Trae = Player;
})(app);
