$(document).ready(function () {
	function communityNavbar() {
		var navTop = $('.anchor-nav').offset().top;
		var windowBottom = $(window).scrollTop() + $(window).height();

		if (windowBottom >= navTop) {
			$('.anchor-nav').addClass("sticky");
		} else {
			$('.anchor-nav').removeClass("sticky");
		}

		var currentScroll = $(window).scrollTop() + 10;
		var sections = $('section');
		var navLinks = $('.anchor-nav a[href^="#"]');

		sections.each(function() {
			var sectionTop = $(this).offset().top - 200;
			var sectionBottom = sectionTop + $(this).outerHeight();

			if (currentScroll >= sectionTop && currentScroll <= sectionBottom) {
				var currentSectionId = $(this).attr('id');

				navLinks.removeClass('active');

				$('a[href="#' + currentSectionId + '"]').addClass('active');
			}
		});
	}

	$(window).on("scroll resize", communityNavbar);

	$('.anchor-nav a[href^="#"]').on('click', function(e) {
		e.preventDefault();
		const target = $($(this).attr('href'));
		const headerHeight = $('header').outerHeight();
		const navHeight = $('.anchor-nav').outerHeight();
	
		const scrollToPosition = target.offset().top - (headerHeight + navHeight);

		$('html, body').animate({
			scrollTop: scrollToPosition
		}, 800);
	});
	

	$('.js-leaderSlider').slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4.9,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 480,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true
				}
			},
			{
				breakpoint: 768,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true
				}
			},
			{
				breakpoint: 1440,
				settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: true
				}
			}
		]
	});
});
