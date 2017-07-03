'use strict';

var app = app||{};

(function(module) {

  function Player(obj, league) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
    this.league = league;
  }

  Player.all = [];

  Player.process = function(data, league) {
    Player.all = data.map(val => new Player(val, league));
  };

  Player.fetch = function() {
    $.get('/trades')
    .then(data => {
      Player.process(data[0].players, data[0].league.name);
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
