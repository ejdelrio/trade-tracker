'use strict';

$('#ind-tweets').hide();

$('nav img').on('click', () => {
  $('nav ul').slideToggle(350);
});

$('#accordion').on('click', function() {
  $('#ind-tweets'.slideToggle('fast'));
});
