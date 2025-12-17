// table.js
const curriculumContainer = document.getElementById("curriculum-container");
curriculumContainer.innerHTML = "";

// Function to generate rows for each year
function generateRowsHTML(year) {
    let html = "";
    for (let i = 1; i <= 10; i++) {
        html += `
        <div class="row">
            <div class="cell destination" id="dest-${year}-${i}-1"></div>
            <div class="cell destination" id="dest-${year}-${i}-2"></div>
        </div>`;
    }

    html += `
    <div class="row total">
        <div class="cell destination" id="total-${year}-1">Total Units: 0</div>
        <div class="cell destination" id="total-${year}-2">Total Units: 0</div>
    </div>`;

    return html;
}

// Function to create a year table
function createYearTable(year) {
    const yearDiv = document.createElement("div");
    yearDiv.classList.add("year-table");
    yearDiv.innerHTML = `
  <div class="year">YEAR ${year}</div>
  <div class="semester-headers">
    <div class="semester-header">1st Semester</div>
    <div class="semester-header">2nd Semester</div>
  </div>
  ${generateRowsHTML(year)}
`;
    return yearDiv;
}

// Create a single horizontal row containing all 4 years
const yearRow = document.createElement("div");
yearRow.classList.add("year-row");
yearRow.style.display = "flex"; // Make years inline
yearRow.style.gap = "20px"; // optional spacing between years

yearRow.appendChild(createYearTable(1));
yearRow.appendChild(createYearTable(2));
yearRow.appendChild(createYearTable(3));
yearRow.appendChild(createYearTable(4));

curriculumContainer.appendChild(yearRow);
