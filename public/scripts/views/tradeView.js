'use strict';

var app = app || {};

(function(module){
  const tradeView = {};

  const render = function(player) {
    let template = handlebars.compile($('Some template name'));
    return template(player);
  };

  tradeView.populateLeagues = function(league) {
    let template = handlebars.compile('#league-template');
    return template(league);
  };

  tradeView.teamLeagues = function(team) {
    let template = handlebars.compile('#team-template');
    return template(team);
  };



  module.tradeView = tradeView;
})(app);
