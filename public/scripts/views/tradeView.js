'use strict';

var app = app || {};

(function(module){
  const tradeView = {};

  const render = function(player) {
    let template = handlebars.compile($('Some template name'));
    return template(player);
  };

  module.tradeView = tradeView;
})(app);
