$(document).ready(function () {
    let selectedCategory = 'all';
    let selectedDuration = 'all';
    let selectedLevel = 'all';
    let selectedPrice = 'all';

    // Function to filter cards
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
});
