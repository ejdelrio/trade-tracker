'use strict';
var app = app || {};

(function(module) {
  const aboutController = {}

  aboutController.init = () => {
    $('#home').hide();
    $('#login').hide();
    $('#about').show();
  }
  module.aboutController = aboutController;
})(app);
