$.material.init(),$(document).ready(function(){"use strict";$("a.menu-open").click(function(a){a.preventDefault(),$("a.menu-open").addClass("mobile-hidden"),$(".menu-container").removeClass("mobile-hidden closed").addClass("open")}),$("a.menu-close").click(function(a){a.preventDefault(),$(".menu-container").addClass("mobile-hidden open").addClass("closed"),$("a.menu-open").removeClass("mobile-hidden")})});