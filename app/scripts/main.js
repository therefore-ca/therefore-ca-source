'use strict';

jQuery(document).ready(function ($) {
  $.material.init();

  $('a.menu-open').click(function (e) {
    e.preventDefault();
    $('a.menu-open').addClass('mobile-hidden');
    $('.menu-container').removeClass('mobile-hidden closed').addClass('open');
  });

  $('a.menu-close').click(function (e) {
    e.preventDefault();
    $('.menu-container').addClass('mobile-hidden open').addClass('closed');
    $('a.menu-open').removeClass('mobile-hidden');
  });

  $('#footer .copyright .copyright-year, .footer .copyright-year').html(new Date().getFullYear());

  // Select .cta-link links with hashes.
  $('a.cta-link[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .on('click', function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
        &&
        location.hostname === this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        // Does a scroll target exist?
        if (target.length) {
          var top = target.offset().top,
            header = $('.header');
          if (header.css('position') === 'fixed') {
            top -= header.outerHeight();
          }

          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: top
          }, 1000);
        }
      }
    });
});

$(".card").flip();
