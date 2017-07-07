'use strict';
var app = app || {};

(function(module) {
  const loginController = {}

  loginController.init = () => {
    $('#home').hide();
    $('#login').show();
    $('#about').hide();
    $('.ind-tweets').hide();

  }
  module.loginController = loginController;
})(app);
