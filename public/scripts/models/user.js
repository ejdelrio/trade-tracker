'use strict';

var app = app||{};

(function(module) {

  const newUser = {};

  function User(formInput) {
    this.first = formInput[0].val();
    this.last = formInput[1].val();
    this.userName = formInput[2].val();
    this.email = formInput[3].val();
    this.password = formInput[4].val();
    this.favorites = [];
  }

  newUser.create = function(e) {
    e.preventDefault();
    let account = new User($('#new-profile input'));
    $.get('/new_profile/validate', account)
    .then(res => {
      !res.body.available ? alert('User name is taken') : newUser.postUser(account);
    });

  };

  newUser.postUser = function(account) {
    $.post('/new_profile', account);
  };


  module.newUser = newUser;
})(app);
