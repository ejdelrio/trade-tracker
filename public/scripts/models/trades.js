'use strict';

var app = app||{};

(function(module) {

  function Player(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  }

  Player.all = [];

  Player.process = function(data) {
    Player.all = data.map(val => new Player(val));
  };

  Player.fetch = function() {
    $.get('/trades')
    .then(data => {
      console.log(data[0].players);
      Player.process(data[0].players);
    });
  };

  Player.fetchLeague = function(field, value, callback) {
    $.get('trades/league', {field: field, val: value})
    .then(callback);
  };

  Player.fetchLeague = function(field, value, callback) {
    $.get('trades/team', {field: field, val: value})
    .then(callback);
  };




  module.Trade = Player;
})(app);
