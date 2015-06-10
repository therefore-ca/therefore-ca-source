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

	var carouselController = function(id) {
		var items = $(id + ' ul.slides li'),
		controls = $(id + ' ul.controls li'),
		tabs = $(id + ' ul.tabs li'),

		count = items.length,
		index = 0;

		var activate = function(index) {
			var control = controls.eq(index);
			var tab = tabs.eq(index);
			var item = items.eq(index);

			items.removeClass('animate');
			items.addClass('hidden').removeClass('active');
			item.removeClass('hidden').addClass('active');
			$(item).addClass('animate');

			controls.removeClass('active')
			control.addClass('active');

			tabs.removeClass('active')
			tab.addClass('active');
		}

		var cycleSlides = setInterval(function () {
			activate(index);
			index += 1;
			if(index > count - 1) {
				index = 0;
			};
		}, 6000);

		$(id + ' ul.controls li a').click(function(e) {
			e.preventDefault();
			var control = $(this).parent('li').index();
			activate(control);
			clearInterval(cycleSlides);
		});

		$(id + ' ul.tabs li a').click(function(e) {
			e.preventDefault();
			var tab = $(this).parent('li').index();
			activate(tab);
			clearInterval(cycleSlides);
		});

	};

	carouselController('#carousel-1');
	carouselController('#carousel-2');


	var waypoint = new Waypoint({
		element: document.getElementById('carousel-2'),
		handler: function() {
			$('ul.slides li.active').addClass('animate');
		},
		offset: '50%'

	});


	$(function() {
		$('.logo-cloud').swipe( {
			swipe:function(event,direction,distance) {
				console.log(direction + ' ' + distance);

				var logoCloud = $('.touch .logo-cloud');
				var middlePos = $('.touch .logo-cloud.middle');
				var rightPos = $('.touch .logo-cloud.right');
				var leftPos = $('.touch .logo-cloud.left');

				var positions = {
					toLeft: function() {
						middlePos.css('margin-left', '-50%');
						middlePos.removeClass('middle').addClass('left');

						rightPos.css('margin-left', '-25%');
						rightPos.removeClass('right left').addClass('middle');

					},
					toRight: function() {
						middlePos.css('margin-left', '0%');
						middlePos.removeClass('middle').addClass('right');

						leftPos.css('margin-left', '-25%');
						leftPos.removeClass('right left').addClass('middle');
					}
				};

				console.log(logoCloud.css('margin-left'));

				if (direction == 'left') {
					positions.toLeft();
				};

				if (direction == 'right') {
					positions.toRight();
				};
			}
		});
	});

});


/*









*/