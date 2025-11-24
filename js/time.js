// Dynamic converter for the construction page

let units = {
    second: 86400,
    minute: 1440,
    hour: 24,
    day: 1,
    week: 0.142857,
    month: 0.032876643423,
    year: 0.0027397232876831892345
};

function roundTwo(n) {
    if (isNaN(n)) {
        return 'NaN';
    }

    let rounded = Math.round(n * 100) / 100;

    let s = String(rounded);
    if (s.indexOf('.') !== -1) {

        while (s.charAt(s.length - 1) === '0') {
            s = s.slice(0, -1);
        }
        if (s.charAt(s.length - 1) === '.') {
            s = s.slice(0, -1);
        }
    }
    return s;
};

let unitFrom = document.getElementById('unitFrom');
let unitTo = document.getElementById('unitTo');
let valueInput = document.getElementById('valueIn');
let result = document.getElementById('result');

function computeAndShow() {
    // read and validate inputs (use only if/else, no shortcuts)
    let fromUnit = 'day';
    let toUnit = 'day';
    let valueIn = 0;

    if (unitFrom && unitFrom.value) {
        fromUnit = unitFrom.value;
    } else {
        fromUnit = 'day';
    }

    if (unitTo && unitTo.value) {
        toUnit = unitTo.value;
    } else {
        toUnit = 'day';
    }

    if (valueInput && valueInput.value !== '') {
        valueIn = parseFloat(valueInput.value);
        if (isNaN(valueIn)) {
            result.textContent = 'Result: Enter a number';
            return;
        }
    } else {
        valueIn = 0;
    }

    // find how many days per 1 unit
    let daysFrom = units[fromUnit];
    let daysTo = units[toUnit];

    if (daysFrom === undefined || daysTo === undefined) {
        result.textContent = 'Result: unit not found';
        return;
    }

    let converted = valueIn * (daysTo / daysFrom);

    let rounded = roundTwo(converted);
    result.style.display = 'block';
    result.textContent = rounded + ' ' + toUnit;
};

if (unitFrom) { unitFrom.addEventListener('change', computeAndShow); };
if (unitTo) { unitTo.addEventListener('change', computeAndShow); };
if (valueInput) { valueInput.addEventListener('input', computeAndShow); };