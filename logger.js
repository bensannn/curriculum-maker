// logger.js
export const destinationState = {}; // global state
export let index = {}

$(function () {
    function updateDestination(destination) {
        const destId = destination.attr('id');
        const items = destination.find(".item").map(function () {
            return $(this).text();
        }).get();

        index = $(".destination").index(destination);
        destinationState[destId] = items;
    }

    $(".destination").each(function () {
        const destination = $(this);

        if (!destination.attr('id')) {
            destination.attr('id', 'dest-' + Math.random().toString(36).substr(2, 5));
        }

        const observer = new MutationObserver(function () {
            updateDestination(destination);
        });

        observer.observe(destination[0], { childList: true });
    });
});
