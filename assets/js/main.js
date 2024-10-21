$(document).ready(function () {
	function initSlickSlider() {
		if ($(window).width() < 769) {
			if (!$(".js-team").hasClass("slick-initialized")) {
				$(".js-team > ul, .js-team").slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
					speed: 400,
					fade: true,
					cssEase: "linear",
				});
			}
		} else {
			if ($(".js-team").hasClass("slick-initialized")) {
				$(".js-team").slick("unslick");
			}
		}
	}

	initSlickSlider();
	$(window).resize(function () {
		initSlickSlider();
	});

	$(window).scroll(function () {
		var sticky = $(".header-main"),
			scroll = $(window).scrollTop();

		var logoLight = $(".logo-light");
		var logoDark = $(".logo-dark");
		var search_icon = $(".search-img");
		var user_icon = $(".user-img");
		var header_btn = $(
			".header-main .btn-cta-light, .header-main .btn-cta-dark"
		);
		var removeFixedTimeout;

		if (scroll >= 40) {
			clearTimeout(removeFixedTimeout);
			if (!sticky.hasClass("fixed")) {
				sticky.addClass("fixed");
				logoLight.hide();
				logoDark.show();
				search_icon.attr("src", "assets/images/search-dark.svg");
				user_icon.attr("src", "assets/images/user-dark.svg");
				header_btn.removeClass("btn-cta-light").addClass("btn-cta-dark");
			}
		} else {
			removeFixedTimeout = setTimeout(function () {
				var updatedScroll = $(window).scrollTop();

				if (updatedScroll < 40) {
					sticky.removeClass("fixed");
					logoLight.show();
					logoDark.hide();
					search_icon.attr("src", "assets/images/search.svg");
					user_icon.attr("src", "assets/images/user.svg");
					header_btn.removeClass("btn-cta-dark").addClass("btn-cta-light");
				}
			}, 300);
		}
	});

	$(".navbar-nav .nav-link").on("click", function (e) {
		e.preventDefault();
	});

	$(".search-toggle").on("click", function (e) {
		e.preventDefault();
		$(this).addClass("search-active");
		$(".search-bar").toggleClass("active");

		$(".search-bar input").focus();
	});

	$(document).on("click", function (e) {
		if (!$(e.target).closest(".search-bar, .search-toggle").length) {
			$(".search-toggle").removeClass("search-active");
			$(".search-bar").removeClass("active");
		}
	});

	$(".navbar-toggler").on("click", function () {
		var logoLight = $(".logo-light");
		var logoDark = $(".logo-dark");

		$(this).toggleClass("active");
		$(".header-main").toggleClass("mobile-active");
		$("body").toggleClass("overflow-hidden");

		if (
			$(".header-main").hasClass("mobile-active") ||
			$(".header-main").hasClass("fixed")
		) {
			logoLight.hide();
			logoDark.show();
		} else {
			logoDark.hide();
			logoLight.show();
		}
	});

	function isDesktop() {
		return window.innerWidth >= 1199;
	}

	function handleDesktopBehavior() {
		$('.navbar-nav .dropdown').hover(
			function () {
				$(this).find('.dropdown-toggle').addClass('show');
				$(this).find('.dropdown-menu').addClass('show');
			},
			function () {
				$(this).find('.dropdown-toggle').removeClass('show');
				$(this).find('.dropdown-menu').removeClass('show');
			}
		);

		$('.navbar-nav .dropdown-toggle, .navbar-nav .nav-link').on('click', function (e) {
			window.location.href = $(this).attr('href');
		});
	}

	function handleMobileBehavior() {
		$('.navbar-nav .dropdown-toggle').on('click', function (e) {
			if ($(e.target).is('.nav-link, .nav-link span')) {
				window.location.href = $(this).attr('href');
			}
		});

		$('.navbar-nav .nav-link').on('click', function (e) {
			window.location.href = $(this).attr('href');
		});

		$('.nav-item.dropdown .nav-link span i').on('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			const $dropdown = $(this).closest('.dropdown');
			$dropdown.find('.dropdown-toggle').addClass('show');
			$dropdown.find('.dropdown-menu').addClass('show');
		});

		$('.dropdown-menu .back-link').on('click', function (e) {
			e.preventDefault();
			const $dropdown = $(this).closest('.dropdown');
			$dropdown.find('.dropdown-toggle').removeClass('show');
			$dropdown.find('.dropdown-menu').removeClass('show');
		});
	}

	function resetEventHandlers() {
		$('.navbar-nav .dropdown').off();
		$('.navbar-nav .dropdown-toggle').off();
		$('.nav-item.dropdown .nav-link span i').off();
		$('.dropdown-menu .back-link').off();
	}

	function initializeBehavior() {
		resetEventHandlers();

		if (isDesktop()) {
			handleDesktopBehavior();
		} else {
			handleMobileBehavior();
		}
	}

	initializeBehavior();

	$(window).resize(function () {
		initializeBehavior();
	});

	// experience-page-plp
	const filterButton = $(".filter-click");
	const mobileItemsDiv = $(".c-course__range__mobile-items");
	const closeButton = $(".close-filter");
	filterButton.on("click", function () {
		mobileItemsDiv.addClass("activefilter");
		$("body").append('<div class="overlay-filter"></div>');
		$("body").css("overflow", "hidden");
	});
	closeButton.on("click", function () {
		mobileItemsDiv.removeClass("activefilter");
		$(".overlay-filter").remove();
		$("body").css("overflow", "");
	});


	// footer-popup
	const $mapImage = $(".map");
	const $popup = $(".c-footer__popup");
	const $closeButton = $(".popup-close");

	$mapImage.on("click", function () {
		$popup.show();
	});
	$closeButton.on("click", function () {
		$popup.hide();
	});

	const $window = $(window);
	const $challengesSection = $(".c-challenges");
	const $challengesTitle = $(".c-challenges__title");
	const $challengesDescription = $(".c-challenges__description");
	const $operations = $(".js-operations");
	const backgroundImage = $challengesSection.css("background-image");
	const defaultBackgroundImage = backgroundImage && backgroundImage !== 'none'
		? backgroundImage.replace(/url\(["']?/, "").replace(/["']?\)$/, "")
		: null;
	const defaultTextColor = "#0B2B35";

	const images = [
		{ backgroundImage: defaultBackgroundImage, textColor: defaultTextColor },
		{
			backgroundImage: $challengesSection.attr("mile-shot-desktopImage"),
			textColor: "white",
		},
		{
			backgroundImage: $challengesSection.attr("night-Shot-desktopImage"),
			textColor: "white",
		},
	];

	let currentIndex = 0;
	let isSliderInitialized = false;

	function updateSection(index = 0) {
		const image = images[index] || {
			backgroundImage: defaultBackgroundImage,
			textColor: defaultTextColor,
		};
		const textColorToApply =
			window.innerWidth > 768 ? image.textColor : defaultTextColor;
		$challengesSection.css("background-image", `url(${image.backgroundImage})`);
		$challengesTitle.css("color", textColorToApply);
		$challengesDescription.css("color", textColorToApply);
	}

	function manageSlickSlider() {
		if ($window.width() <= 1200 && !isSliderInitialized) {
			$operations.slick({
				infinite: true,
				speed: 500,
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: false,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							arrows: true,
						},
					},
				],
			});
			isSliderInitialized = true;
		} else if ($window.width() > 1200 && isSliderInitialized) {
			$operations.slick("unslick");
			isSliderInitialized = false;
		}
	}

	$window.on("resize", function () {
		manageSlickSlider();
		updateSection();
	});

	$(".c-card--challenge").removeClass("active");
	$(".c-card--challenge:first").addClass("active");
	updateSection(0);

	$(".c-card--challenge").hover(function () {
		const index = $(".c-card--challenge").index(this);

		$(".c-card--challenge").removeClass("active");
		$(this).addClass("active");
		updateSection(index);
	});

	$(".js-cardAnimation").mouseenter(function () {
		$(".js-cardAnimation").removeClass("active");
		$(this).addClass("active");
	});

	$operations.on("click", ".slick-next", function () {
		currentIndex = (currentIndex + 1) % images.length;
		updateSection(currentIndex);
	});

	$operations.on("click", ".slick-prev", function () {
		currentIndex = (currentIndex - 1 + images.length) % images.length;
		updateSection(currentIndex);
	});

	$operations.on("afterChange", function (event, slick, currentSlide) {
		currentIndex = currentSlide % images.length;
		updateSection(currentIndex);
	});

	manageSlickSlider();

	// testimonal slider
	$(".testimonal-slider").slick({
		dots: false,
		infinite: false,
		speed: 10,
		fade: true,
		arrows: false,
		asNavFor: ".profile-slider",
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					arrows: false,
					dots: true,
				},
			},
		],
	});

	$(".profile-slider").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		focusOnSelect: true,
		infinite: false,
		arrows: false,
		asNavFor: ".testimonal-slider",
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2.8,
					variableWidth: false,
				},
			},
			{
				breakpoint: 767,
				settings: {
					variableWidth: false,
					slidesToShow: 1.55,
				},
			},
		],
	});

	// community slider and news slider
	var slider = $(".image-slider");
	var slideCount = slider.find(".image-slider__item").length;
	function initializeSliderCommnuityNews() {
		var windowWidth = $(window).width();
		if (windowWidth > 1200) {
			if (slideCount > 6 && !slider.hasClass("slick-initialized")) {
				slider.slick({
					infinite: false,
					slidesToShow: 6,
					slidesToScroll: 6,
					arrows: false,
					dots: false,
					responsive: [
						{
							breakpoint: 1490,
							settings: {
								slidesToShow: 5,
								slidesToScroll: 5,
								arrows: false,
								dots: false,
							},
						},
					],
				});
			}
		} else {
			if (!slider.hasClass("slick-initialized")) {
				slider.slick({
					infinite: true,
					slidesToShow: 3.1,
					slidesToScroll: 1,
					arrows: false,
					dots: false,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2.1,
								slidesToScroll: 1,
								arrows: false,
								dots: false,
							},
						},
						{
							breakpoint: 767,
							settings: {
								slidesToShow: 1.1,
								slidesToScroll: 1,
								arrows: false,
								dots: false,
							},
						},
					],
				});
			}
		}
		if (windowWidth <= 767) {
			if (!$(".news-cards").hasClass("slick-initialized")) {
				$(".news-cards").slick({
					infinite: false,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
				});
			}
		}
	}
	initializeSliderCommnuityNews();

	$window.on("resize", function () {
		if (slider.hasClass("slick-initialized")) {
			slider.slick("unslick");
		}
		if ($(".news-cards").hasClass("slick-initialized")) {
			$(".news-cards").slick("unslick");
		}
		initializeSliderCommnuityNews();
	});

	var $btnBookNow = $(".btn-book-now");
	var $footer = $("footer");

	function checkFooterVisibility() {
		var footerTop = $footer.offset().top;
		var windowBottom = $(window).scrollTop() + $(window).height();

		if (windowBottom >= footerTop) {
			$btnBookNow.addClass("hide");
		} else {
			$btnBookNow.removeClass("hide");
		}
	}

	$(window).on("scroll resize", checkFooterVisibility);
	checkFooterVisibility();

	$(document).on("mouseover", ".tab-link", function () {
		var numberIndex = $(this).index();
		$(".tab-link").removeClass("active");
		$(".c-members__content").removeClass("active animationTabLink");

		if ($(this).hasClass("active")) {
			return;
		}

		$(this).addClass("active");

		$(".tab-content-container")
			.find(".c-members__accordion-item:eq(" + numberIndex + ")")
			.find(".tab-content")
			.addClass("active");

		setTimeout(() => {
			$(".tab-content-container")
				.find(".c-members__accordion-item:eq(" + numberIndex + ")")
				.find(".tab-content")
				.addClass("animationTabLink");
		}, 100);

		var listItemHeight = $(".tab-content-container")
			.find(".c-members__accordion-item:eq(" + numberIndex + ")")
			.find(".tab-content")
			.innerHeight();
		$(".tab-content-container").height(listItemHeight + "px");
	});

	function tabContentShowHideMobile(clickedElement) {
		var targetContent = $("#content-" + clickedElement.data("target"));
		$(".tab-content.active")
			.not(targetContent)
			.each(function () {
				$(this).removeClass("active").css("height", 0);
				$(".c-members__accordion-item__title").removeClass("active");
			});

		if (targetContent.hasClass("active")) {
			var contentHeight = targetContent.prop("scrollHeight");
			targetContent.css("height", contentHeight + "px");

			requestAnimationFrame(function () {
				targetContent.css("height", 0);
			});

			targetContent.off("transitionend").on("transitionend", function () {
				targetContent.removeClass("active");
				$(this).parent().removeClass("active");
				targetContent.css("height", "");
			});

			clickedElement.parent().removeClass("active");
		} else {
			targetContent.addClass("active");
			clickedElement.parent().addClass("active");

			targetContent.css("height", "auto");
			var contentHeight = targetContent.prop("scrollHeight");
			targetContent.css("height", 0);

			setTimeout(function () {
				targetContent.css("height", contentHeight + "px");
			}, 10);

			targetContent.off("transitionend").on("transitionend", function () {
				if (targetContent.hasClass("active")) {
					targetContent.css("height", "auto");
				}
			});
		}
	}

	$(".accordion-link").on("click", function () {
		tabContentShowHideMobile($(this));
	});
});
