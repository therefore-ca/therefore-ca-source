$.material.init();


$( document ).ready(function() {
	'use strict';

	$('a.menu-open').click(function(e) {
		e.preventDefault();
		$('a.menu-open').addClass('mobile-hidden');	
		$('.menu-container').removeClass('mobile-hidden closed').addClass('open');	
	});

	$('a.menu-close').click(function(e) {
		e.preventDefault();
		$('.menu-container').addClass('mobile-hidden open').addClass('closed');
		$('a.menu-open').removeClass('mobile-hidden');	
	});

	var carouselController = function() {
		var items = $('div.carousel ul.slides li'),
		controls = $('div.carousel ul.controls li'),
		count = items.length,
		index = 0;

		var activate = function(index) {
			var control = controls.eq(index);
			var item = items.eq(index);

			items.addClass('hidden');
			item.removeClass('hidden');

			controls.removeClass('active')
			control.addClass('active');
		}

		var cycleSlides = setInterval(function () {
			activate(index);
			index += 1;
			if(index > count - 1) {
				index = 0;
			};
		}, 6000);

		$('div.carousel ul.controls li a').click(function(e) {
			e.preventDefault;
			var control = $(this).parent('li').index();
			activate(control);
			clearInterval(cycleSlides);
		});


	};

	carouselController();
});


/* 








*/