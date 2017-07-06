'use strict';

var app = app|| {};

function IFFE (module){

  let Tweets = {};
  Tweets.first = [];
  Tweets.second = [];

  Tweets.compile = function(tweet) {
    let template = Handlebars.compile($('#ind-tweet').text());

    return template(tweet);
  };

  Tweets.render = function(tweet, target) {
    console.log($(target));
    $(target).append(Tweets.compile(tweet));

  };

  Tweets.runBoth = function() {
    Tweets.first.forEach(tweet => Tweets.render(tweet, '#twit-one'));
    Tweets.second.forEach(tweet => Tweets.render(tweet, '#twit-two'));
  };

  console.log('success');
  module.Tweets = Tweets;
}
IFFE(app);
