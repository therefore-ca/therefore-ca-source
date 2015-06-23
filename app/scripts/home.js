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
			var nextItem;
			var prevItem;

			items.removeClass('animate next previous');
			items.addClass('hidden').removeClass('active');
			item.removeClass('hidden').addClass('active');
			$(item).addClass('animate');

			controls.removeClass('active')
			control.addClass('active');

			tabs.removeClass('active')
			tab.addClass('active');


			if (index < count - 1) {
				nextItem = items.eq(index + 1);
				nextItem.addClass('next');
			} else {
				nextItem = items.eq(0);
				nextItem.addClass('next');
			}

			if (index > 0) {
				prevItem = items.eq(index - 1);
				prevItem.addClass('previous');
			} else {
				prevItem = items.eq(2);
				prevItem.addClass('previous');
			}
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

		$(id + ' ul.slides li a.btn').focus(function() {
			$('.slideshow li.slide').addClass('no-animate');
			clearInterval(cycleSlides);
			var itemFocus = $(this).parents('li').prev().index() + 1;
			activate(itemFocus);
		});

		$(id + ' ul.arrows a.previous').click(function(e) {
			$('.slideshow ul.arrows li a').addClass('disabled');

			e.preventDefault();
			clearInterval(cycleSlides);

			if (index > 0) {
				index = index - 1;
				$('li.slide').removeClass('in');
				activate(index);
				$('.slideshow li.slide.next').addClass('in');
			} else {
				index = count - 1;
				$('.slideshow li.slide').removeClass('in');
				activate(index);
				$('.slideshow li.slide.next').addClass('in');
			}
			$("li.slide.active").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
				$('.slideshow ul.arrows li a').removeClass('disabled');
				$('.slideshow li.slide').removeClass('in');

			});
		});


		$(id + ' ul.arrows a.next').click(function(e) {
			$('.slideshow ul.arrows li a').addClass('disabled');
			e.preventDefault();
			clearInterval(cycleSlides);

			if (index < count - 1) {
				index = index + 1;
				$('li.slide').removeClass('in');
				activate(index);
				$('.slideshow li.slide.previous').addClass('in');

			} else {
				index = 0;
				$('li.slide').removeClass('in');
				activate(index);
				$('.slideshow li.slide.previous').addClass('in');
			}

			$("li.slide.active").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
				$('.slideshow ul.arrows li a').removeClass('disabled');
				$('.slideshow li.slide').removeClass('in');

			});

		});
	};

	carouselController('#carousel-1');
	carouselController('#carousel-2');
	/* carouselController('#carousel-3'); */


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
