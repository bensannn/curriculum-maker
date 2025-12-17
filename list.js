import { combined } from './data.js';
import { saveLayout } from './script.js';

$(function () {
    const container = $("#container");

    // 1️⃣ Generate initial courses from combined
    Object.keys(combined).forEach((key, index) => {
        let displayName = key.replace(/dot/g, '.').replace(/slash/g, '/').split('_');
        const courseItem = displayName[0] + ' ' + displayName[1]
        // Only create if it doesn't exist
        if (!document.getElementById(`item-${key}`)) {
            const item = $("<div></div>")
                .addClass("item")
                .attr("id", `item-${key}`)
                .text(courseItem)
                .draggable({ revert: "invalid", zIndex: 100 });

            container.append(item);
        }
    });

    // 2️⃣ Load locally saved added courses
    const savedCourses = JSON.parse(localStorage.getItem("addedCourses")) || [];
    savedCourses.forEach(course => {
        if (!document.getElementById(`item-${course.key}`)) {
            combined[course.key] = course.value;
            const newItem = $("<div></div>")
                .addClass("item")
                .attr("id", `item-${course.key}`)
                .text(course.name)
                .draggable({ revert: "invalid", zIndex: 100 });

            container.append(newItem);
        }
    });

    // 3️⃣ Restore layout if saved
    const savedLayout = JSON.parse(localStorage.getItem("dragLayout")) || {};
    Object.keys(savedLayout).forEach(courseKey => {
        const parentId = savedLayout[courseKey];
        const item = $(`#item-${courseKey}`);
        if (item.length) {
            $(`#${parentId}`).append(item.css({ left: "0", top: "0" }));
        }
    });
});
