// data.js
export let combined = {
    PI_10: ['3:3:1:3', 'NA', 5],
    KAS_1: ['3:3:1:3', 'NA', 5],
    HIST_1: ['3:3:1:3', 'NA', 5],
    COMM_10: ['3:3:1:3', 'NA', 5],
    ETHICS_1: ['3:3:1:3', 'NA', 5],
    STS_1: ['3:3:1:3', 'NA', 5],
    ARTS_1: ['3:3:1:3', 'NA', 5],
    ENG_10: ['3:3:1:3', 'NA', 5],
    STAT_101: ['3:3:1:3', 'NA', 5],
    NSTP_1: ['2:2:1:0', 'NA', 5],
    NSTP_2: ['2:2:1:0', 'NA', 5],
    HK_11: ['2:2:1:0', 'NA', 5],
    HK_12slash13: ['2:2:1:0', 'NA', 5],
    HK_12slash13_1: ['2:2:1:0', 'NA', 5],
    HK_12slash13_2: ['2:2:1:0', 'NA', 5],
    // existing courses
    // "ABE_30": ["1 Lec:2:1:1", "NA", 1],
};
// Function to add a new course dynamically
export function addCourseToData(key, hours, units) {
    // Use format: "Hours:SomeValue:OtherValue:Units"
    const formatted = `0:${hours}:0:${units}`;
    combined[key] = [formatted, "NA", 1];
}
