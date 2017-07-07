'use strict';

$('#ind-tweets').hide();

$('#accordion').on('click', function() {
  $('#ind-tweets').slideToggle('fast');
});

var app = app||{};

(function(module) {
  let controller = {};

  controller.loggedIn = false;

  controller.currentUser = null;

  module.controller = controller;
})(app);
