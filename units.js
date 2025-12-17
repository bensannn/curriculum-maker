import { combined } from './data.js';

export function calculateUnits() {
    for (let y = 1; y <= 4; y++) {
        let leftTotal = 0, leftHour = 0;
        let rightTotal = 0, rightHour = 0;

        for (let r = 1; r <= 10; r++) {
            for (let c = 1; c <= 2; c++) {
                const cell = $(`#dest-${y}-${r}-${c}`);
                cell.children(".item").each(function () {
                    let text = $(this).text().trim();
                    let key = text.replace(/\s/g, '_').replace(/\./g, 'dot').replace(/\//g, 'slash');

                    if (combined[key]) {
                        const parts = combined[key][0].split(':');
                        let hours = parseInt(parts[1], 10) || 0;
                        let units = parseInt(parts[3], 10) || 0;

                        if (c === 1) { leftTotal += units; leftHour += hours; }
                        else { rightTotal += units; rightHour += hours; }
                    }
                });
            }
        }

        // Update totals
        $(`#total-${y}-1`).text(`Total Units: ${leftTotal}\nTotal Hours: ${leftHour}`).css('white-space','pre');
        $(`#total-${y}-2`).text(`Total Units: ${rightTotal}\nTotal Hours: ${rightHour}`).css('white-space','pre');
    }
}
