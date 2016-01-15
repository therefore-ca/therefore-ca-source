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
});

$(".card").flip();