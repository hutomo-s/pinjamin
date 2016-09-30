$(document).ready(function () {
  $('.nav-toggle-button').on('click touchstart', function () {
    $('.row-offcanvas').toggleClass('active');
    console.log('nav toggle?????');
  });
});