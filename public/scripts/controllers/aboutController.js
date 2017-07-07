'use strict';
var app = app || {};

(function(module) {
  const aboutController = {}

  aboutController.init = () => {
    $('#home').hide();
    $('#login').hide();
    $('#about').show();
    $('.ind-tweets').hide();

  }
  module.aboutController = aboutController;
})(app);
