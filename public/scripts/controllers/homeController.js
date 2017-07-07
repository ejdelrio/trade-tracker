'use strict';
var app = app || {};

(function(module) {
  const homeController = {};

  homeController.init = () => {
    $('#home').show();
    $('#login').hide();
    $('#about').hide();
    $('.ind-tweets').hide();

  };
  module.homeController = homeController;
})(app);
