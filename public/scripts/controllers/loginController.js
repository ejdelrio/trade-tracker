'use strict';
var app = app || {};

(function(module) {
  const loginController = {};

  // DONE: Define a function that hides all main section elements, and then reveals just the #about section:
  loginController.showPage = () => {
    $('main > section').hide();
    $('#login-page').show();
  }

  module.loginController = loginController;
})(app);
