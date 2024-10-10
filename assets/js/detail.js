// PDP-EXPERIENCES-SLIDER
$('.js-experiencesGallery').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    prevArrow: '<button class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
    nextArrow: '<button class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                prevArrow: '<button class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
                nextArrow: '<button class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>'
            }
        },
        {
            breakpoint: 0,
            settings: {
                prevArrow: false,
                nextArrow: false
            }
        }
    ]
});

// Function to initialize the slider
function initializeSlider() {
    var windowWidth = $(window).width();
    if (windowWidth <= 1439.98) {
        var slidesToShow = windowWidth <= 768 ? 1 : 2;

        if (!$('.js-experiencesSlider').hasClass('slick-initialized')) {
            $('.js-experiencesSlider').slick({
                infinite: false,
                slidesToShow: slidesToShow,
                slidesToScroll: 1,
                dots: true,
                prevArrow: false,
                nextArrow: false
            });
        } else {
            $('.js-experiencesSlider').slick('slickSetOption', 'slidesToShow', slidesToShow, true);
        }
    } else {
        if ($('.js-experiencesSlider').hasClass('slick-initialized')) {
            $('.js-experiencesSlider').slick('unslick');
        }
    }
}

$(document).ready(function () {
    initializeSlider();

    $(window).resize(function () {
        initializeSlider();
    });
});