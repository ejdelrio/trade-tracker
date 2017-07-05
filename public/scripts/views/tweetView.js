'use strict';

var app = app || {};

(function(module){
  const tweetView = {};

  const render = function(tweeter) {
    let template = handlebars.compile($('Some template name'));
    return template(tweeter);
  };


  module.tweetView = tweetView;
})(app);
