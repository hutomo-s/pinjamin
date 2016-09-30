$(document).ready(function () {
  $('nav-toggle-button').click(function () {
    $('.row-offcanvas').toggleClass('active');
    console.log('nav toggle');
  });
});