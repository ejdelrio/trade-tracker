'use strict';

var app = app||{};

(function(module) {


  const Tweet = function(tweet) {
    Object.keys(tweet).forEach(key => this[key] = tweet[key]);
  };

  Tweet.all = JSON.parse(app.tweets).map(tweet => new Tweet(tweet));




  module.tweetObj = Tweet.all;
})(app);
