'use strict';

$('#ind-tweets').hide();

$('#accordion').on('click', function() {
  $('#ind-tweets').slideToggle('fast');
});
