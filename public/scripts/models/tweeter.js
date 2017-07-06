'use strict';

var app = app||{};

(function(module){

  const Tweeter = function(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  };

  Tweeter.all = [];

  Tweeter.getTweeters = function(twitOne, twitTwo) {
    $.get(`/search/tweets.json?q=from%3A%40${twitOne}%20%40${twitTwo}&src=typd`)
    .then(data => {
      Tweeter.all.push(new Tweeter(data));
    })
    .then($.get(`/search/tweets.json?q=from%3A%40${twitTwo}%20%40${twitOne}&src=typd`)
    .then(data => Tweeter.all.push(new Tweeter(data))));
  };

  module.Tweeter = Tweeter;
})(app);
