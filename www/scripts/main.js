"use strict";jQuery(document).ready(function(a){a.material.init(),a("a.menu-open").click(function(b){b.preventDefault(),a("a.menu-open").addClass("mobile-hidden"),a(".menu-container").removeClass("mobile-hidden closed").addClass("open")}),a("a.menu-close").click(function(b){b.preventDefault(),a(".menu-container").addClass("mobile-hidden open").addClass("closed"),a("a.menu-open").removeClass("mobile-hidden")})});