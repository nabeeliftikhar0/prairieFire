$(document).ready(function () {
    // Desktop Filters
    let selectedCategory = 'all';
    let selectedDuration = 'all';
    let selectedLevel = 'all';
    let selectedPrice = 'all';

    function filterCards() {
        $('.experience__card').each(function () {
            const categories = $(this).data('category').toString().split(' ');
            const duration = $(this).data('duration');
            const level = $(this).data('level');
            const price = $(this).data('price');

            let matchCategory = true;
            let matchDuration = true;
            let matchLevel = true;
            let matchPrice = true;

            if (selectedCategory && selectedCategory !== 'all') {
                matchCategory = categories.includes(selectedCategory);
            }

            if (selectedDuration && selectedDuration !== 'all') {
                matchDuration = (duration == selectedDuration);
            }

            if (selectedLevel && selectedLevel !== 'all') {
                matchLevel = (level == selectedLevel);
            }

            if (selectedPrice && selectedPrice !== 'all') {
                matchPrice = (price == selectedPrice);
            }

            if (matchCategory && matchDuration && matchLevel && matchPrice) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $('.c-course__range__filter-link').click(function (e) {
        e.preventDefault();
        $('.c-course__range__filter-link').removeClass('active-page');
        $(this).addClass('active-page');
        selectedCategory = $(this).data('category');
        filterCards();
    });

    $('.c-course__range__filter .dropdown-item').on('click', function (e) {
        e.preventDefault();
        var selectedText = $(this).text();
        var filterValue = $(this).data('value');
        var filterType = $(this).closest('.dropdown').data('filter-type');
    
        $(this).closest('.dropdown').find('.dropdown-toggle').text(selectedText);
        if (filterType === 'duration') {
            selectedDuration = filterValue;
        } else if (filterType === 'level') {
            selectedLevel = filterValue;
        } else if (filterType === 'price') {
            selectedPrice = filterValue;
        }

        filterCards();
    });

    $('.c-course__range__clear').click(function (e) {
        e.preventDefault();
        selectedCategory = 'all';
        selectedDuration = 'all';
        selectedLevel = 'all';
        selectedPrice = 'all';

        $('.c-course__range__filter-link').removeClass('active-page');
        $('.c-course__range__filter-link[data-category="all"]').addClass('active-page');

        $('.c-course__range .dropdown-toggle').each(function() {
            $(this).text('All');
        });
        filterCards();
    });

    filterCards();

    // Mobile Filters
    let selectedMobileCategory = 'all';
    let selectedMobileDurations = [];
    let selectedMobileLevels = [];
    let selectedMobilePrices = [];

    $('.mobile-category input[name="option"]').change(function() {
        selectedMobileCategory = $(this).attr('id');
    });


    $('.mobile-duration input[type="checkbox"]').change(function() {
        selectedMobileDurations = [];

        $('.mobile-duration input[type="checkbox"]:checked').each(function() {
            const durationId = $(this).attr('id');
            const durationValue = durationId === '4hrs' ? 4 : parseInt(durationId.match(/\d+/));
            selectedMobileDurations.push(durationValue);
        });
    });

    $('.mobile-level input[type="checkbox"]').change(function() {
        selectedMobileLevels = [];

        $('.mobile-level input[type="checkbox"]:checked').each(function() {
            const levelId = $(this).attr('id');
            selectedMobileLevels.push(levelId);
        });
    });

    $('.mobile-price input[type="checkbox"]').change(function() {
        selectedMobilePrices = [];

        $('.mobile-price input[type="checkbox"]:checked').each(function() {
            const priceId = $(this).attr('id');
            switch (priceId) {
                case 'price':
                    selectedMobilePrices.push({ min: 1, max: 50 });
                    break;
                case 'price1':
                    selectedMobilePrices.push({ min: 51, max: 75 });
                    break;
                case 'price2':
                    selectedMobilePrices.push({ min: 76, max: 100 });
                    break;
                case 'price3':
                    selectedMobilePrices.push({ min: 101, max: 150 });
                    break;
                case 'price4':
                    selectedMobilePrices.push({ min: 151, max: Infinity });
                    break;
            }
        });
    });

    $('.c-course__range__filbtn').click(function(e) {
        e.preventDefault();
        $('.mobile-items').removeClass('activefilter');
        $(".overlay-filter").remove();
        $("body").css("overflow", "");

        filterMobileCards();

        updateSelectedFilters();
    });

    function filterMobileCards() {
        $('.experience__card').each(function() {
            const cardCategory = $(this).data('mobile-category');
            const cardDuration = parseInt($(this).data('mobile-duration'));
            const cardLevel = $(this).data('mobile-level');
            const cardPrice = parseFloat($(this).data('mobile-price'));
            const categoryMatches = selectedMobileCategory === 'all' || cardCategory.includes(selectedMobileCategory);

            const durationMatches = selectedMobileDurations.length === 0 ||
                                    selectedMobileDurations.includes(cardDuration) || 
                                    (selectedMobileDurations.includes(4) && cardDuration >= 4);

            const levelMatches = selectedMobileLevels.length === 0 || 
                                selectedMobileLevels.includes(cardLevel) || 
                                selectedMobileLevels.includes('allLevel');

            const priceMatches = selectedMobilePrices.length === 0 ||
                                selectedMobilePrices.some(priceRange => cardPrice >= priceRange.min && cardPrice <= priceRange.max);

            if (categoryMatches && durationMatches && levelMatches && priceMatches) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    function updateSelectedFilters() {
        const selectedFiltersContainer = $('.selected_filters');
        selectedFiltersContainer.empty();

        let categoryFilter = selectedMobileCategory !== 'all' ? capitalizeFirstLetter(selectedMobileCategory) : 'All Experiences';
        selectedFiltersContainer.append(`<a href="#" class="c-course__range__filmolinks">${categoryFilter}</a>`);

        if (selectedMobileDurations.length > 0) {
            let durationFilter = selectedMobileDurations.map(d => d === 4 ? '4+ hours' : `${d} hour${d > 1 ? 's' : ''}`).join(', ');
            selectedFiltersContainer.append(`<a href="#" class="c-course__range__filmolinks">${durationFilter}</a>`);
        }

        let levelFilter = selectedMobileLevels.includes('allLevel') 
        ? 'All Levels' 
        : selectedMobileLevels.length > 0 
            ? selectedMobileLevels.map(level => capitalizeFirstLetter(level)).join(', ') 
            : '';

        if (levelFilter) {
            selectedFiltersContainer.append(`<a href="#" class="c-course__range__filmolinks">${levelFilter}</a>`);
        }

        if (selectedMobilePrices.length > 0) {
            let priceFilter = selectedMobilePrices.map(price => price.max === Infinity ? `${price.min}+` : `${price.min}-${price.max}`).join(', ');
            selectedFiltersContainer.append(`<a href="#" class="c-course__range__filmolinks">${priceFilter}</a>`);
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function clearMobileFilters() {
        selectedMobileCategory = 'all';
        selectedMobileDurations = [];
        selectedMobileLevels = [];
        selectedMobilePrices = [];

        $('.mobile-category input[type="radio"]').prop('checked', false);
        $('.mobile-duration input[type="checkbox"]').prop('checked', false);
        $('.mobile-level input[type="checkbox"]').prop('checked', false);
        $('.mobile-price input[type="checkbox"]').prop('checked', false);

        $('.mobile-category input[type="radio"]').first().prop('checked', true);
        selectedMobileCategory = $('.mobile-category input[type="radio"]').first().attr('id');

        $('.experience__card').show();

        updateSelectedFilters();
    }

    $('.c-course__range__clearmobile').click(function(e) {
        e.preventDefault();
        clearMobileFilters();
    });
});
