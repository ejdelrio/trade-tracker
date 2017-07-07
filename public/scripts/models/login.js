'use strict';

var app = app||{};

(function(module) {

  const login = {};
  let $login = $('#login');

  login.verifyUser = (e) => {
    let attempt = {};
    e.preventDefault();
    attempt.userName = $login.find('input').first().val();
    attempt.passWord = $login.find('input').last().val();
    $.get('/validate', attempt)
    .then(res => {
      !res ? alert('User name does not exist!') : login.verifyPass(attempt);
    });
  };

  login.verifyPass = (password) => {
    $.get('/password', password).then(data => console.log(data));
  };

  $login.find('button').on('click',login.verifyUser);

  module.login = login;
})(app);
