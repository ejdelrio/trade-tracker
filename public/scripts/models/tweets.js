'use strict';
var app = app|| {}

(funtion(module){

  let Tweets = {};
  Tweets.first = [];
  Tweets.second = [];

  Tweets.compile = function(tweet) {
    let template = Handlebars.compile($('#ind-tweet').text())

    return template(tweet);
  }


  module.Tweets = Tweets;
})(app);
