import { calculateUnits } from './units.js';

export function saveLayout() {
    const layout = {};
    $(".item").each(function () {
        const parent = $(this).parent();
        layout[this.id.replace('item-', '')] = parent.attr("id") || "container";
    });
    localStorage.setItem("dragLayout", JSON.stringify(layout));
    calculateUnits();
}

$(function() {
    // ================= RESET BUTTON =================
    $("#resetLayout").on("click", function () {
        localStorage.removeItem("dragLayout");
        $(".item").each(function () {
            $(this).css({ left: "0", top: "0" }).appendTo($("#container"));
        });
        calculateUnits();
    });

    // ================= DROPPABLE CELLS =================
    $(".row").not(".total").find(".destination").droppable({
        accept: ".item",
        drop: function (event, ui) {
            ui.draggable.css({ left: "0", top: "0" }).appendTo($(this));
            saveLayout();
        }
    });

    $("#container").droppable({
        accept: ".item",
        drop: function (event, ui) {
            ui.draggable.css({ left: "0", top: "0" }).appendTo($(this));
            saveLayout();
        }
    });

    // ================= INITIALIZE ITEMS =================
    $(".item").draggable({
        revert: "invalid",
        zIndex: 100
    });
});
