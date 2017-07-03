'use strict';

var app = app||{};

(function(module) {

  const newUser = {};

  function User(first, last, email, password) {
    this.first = first;
    this.last = last;
    this.email = email;
    this.password = password;
    this.favorites = [];
  }

  newUser.create = function() {
    
  };


  module.newUser = newUser;
})(app);
