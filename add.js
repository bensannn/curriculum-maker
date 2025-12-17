import { combined } from './data.js';
import { calculateUnits } from './units.js';

$(function() {
    const form = $("#add-course-form");
    const container = $("#container");

    // Load locally saved added courses
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

    // Form submission
    form.on("submit", function(e) {
        e.preventDefault();

        const courseName = ($("#course-name").val().trim()).toUpperCase();
        const courseHours = $("#course-hours").val().trim();
        const courseUnits = $("#course-units").val().trim();

        if (!courseName || !courseHours || !courseUnits) {
            alert("All fields are required!");
            return;
        }

        let key = courseName.replace(/\s+/g, '_').replace(/\./g,'dot').replace(/\//g,'slash');

        // Prevent duplicates
        if (document.getElementById(`item-${key}`)) {
            alert("Course already exists!");
            return;
        }

        const value = [`${courseHours}:${courseHours}:${courseHours}:${courseUnits}`, "NA", 0];
        combined[key] = value;

        // Save locally
        savedCourses.push({ key, value, name: courseName });
        localStorage.setItem("addedCourses", JSON.stringify(savedCourses));

        // Create draggable item
        const newItem = $("<div></div>")
            .addClass("item")
            .attr("id", `item-${key}`)
            .text(courseName)
            .draggable({ revert: "invalid", zIndex: 100 });

        container.append(newItem);

        // Clear form
        $("#course-name").val("");
        $("#course-hours").val("");
        $("#course-units").val("");

        calculateUnits();
    });
});

// Create a trash area
const trash = $("<div id='trash'>Drag here to delete</div>");
$("body").append(trash);

// Style it (optional)
$("#trash").css({
    position: "fixed",
    top: "10px",
    left: "10px",
    width: "150px",
    height: "50px",
    background: "red",
    color: "white",
    "text-align": "center",
    "line-height": "50px",
    "z-index": 1000
});

// Make trash droppable
$("#trash").droppable({
    accept: ".item",
    drop: function(event, ui) {
        const text = ui.draggable.text().trim();
        let key = text.replace(/\s+/g, '_').replace(/\./g,'dot').replace(/\//g,'slash');

        if (combined[key]) {
            const units = parseInt(combined[key][2], 10) || 0;

            if (units === 0) {
                // Remove from DOM
                ui.draggable.remove();

                // Remove from local storage if added course
                const savedCourses = JSON.parse(localStorage.getItem("addedCourses")) || [];
                const index = savedCourses.findIndex(c => c.key === key);
                if (index !== -1) {
                    savedCourses.splice(index, 1);
                    localStorage.setItem("addedCourses", JSON.stringify(savedCourses));
                }

                // Remove from combined
                delete combined[key];

                alert(`${text} deleted successfully!`);
            } else {
                alert(`Cannot delete ${text}. This is a required course.`);
            }
        }
    }
});

