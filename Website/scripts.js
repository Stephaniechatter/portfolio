$(document).ready(function() {
    // Function to handle adding activities
    function handleAddActivity(event) {
        event.preventDefault();

        var $form = $(this).closest('form');
        var dayId = $form.closest('.day').attr('id');
        var type = $form.find('.activity-type').val().trim();
        var name = $form.find('.activity-name').val().trim();

        if (type && name) {
            var $ul = $('#' + dayId + '-activities');
            var $li = $('<li>').text(type + ': ' + name).addClass('sortable-item');
            $ul.append($li);

            // Clear input fields
            $form.find('.activity-type').val('');
            $form.find('.activity-name').val('');

            saveActivities();
        }
    }

    // Event listener for add activity buttons
    $('.add-activity-btn').click(handleAddActivity);

    // Make the activities sortable
    $('.sortable-list').sortable({
        connectWith: '.sortable-list',
        update: function(event, ui) {
            saveActivities();
        }
    });

    // Event listener for deleting activities
    $(document).on('click', '.sortable-item', function() {
        $(this).remove();
        saveActivities();
    });

    // Function to save activities to localStorage
    function saveActivities() {
        $('.sortable-list').each(function() {
            var dayId = $(this).attr('id').replace('-activities', '');
            var activities = $(this).find('.sortable-item').map(function() {
                return $(this).text();
            }).get();
            localStorage.setItem(dayId + 'Activities', JSON.stringify(activities));
        });
    }

    // Function to load activities from localStorage
    function loadActivities() {
        $('.sortable-list').each(function() {
            var dayId = $(this).attr('id').replace('-activities', '');
            var storedActivities = localStorage.getItem(dayId + 'Activities');
            if (storedActivities) {
                var activities = JSON.parse(storedActivities);
                var $ul = $('#' + dayId + '-activities');
                activities.forEach(function(activity) {
                    var $li = $('<li>').text(activity).addClass('sortable-item');
                    $ul.append($li);
                });
            }
        });
    }

    // Initialize
    loadActivities();

    // Dropdown menu functionality for units
    $('.dropdown').hover(
        function() {
            $(this).children('.dropdown-content').slideDown(200);
        },
        function() {
            $(this).children('.dropdown-content').slideUp(200);
        }
    );

    // Datepicker functionality for week plan
    $('#week-plan').datepicker();

    // Additional code for dynamic unit content goes here if needed
});
