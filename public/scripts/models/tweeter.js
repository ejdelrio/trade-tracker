'use strict';

var app = app||{};

(function(module){

  const Tweeter = function(obj) {
    Object.keys(obj).forEach(key => this[key] = obj[key]);
  };

  Tweeter.all = [];

  Tweeter.getTweeter = function(searchVal) {
    $.get(`/search/${searchVal}`, (req, res) => {
      res.body = token;
    });
  };

  module.Tweeter = Tweeter;
})(app);
