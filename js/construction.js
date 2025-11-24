// Dynamic converter for the construction page

let units = {
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    meter: 1,
    centimeter: 0.01
};

function roundTwo(n) {
    if (isNaN(n)) {
        return 'NaN';
    }

    let r = Math.round(n * 100) / 100;

    let s = String(r);
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
    let fromUnit = 'meter';
    let toUnit = 'meter';
    let valueInNum = 0;

    if (unitFrom && unitFrom.value) {
        fromUnit = unitFrom.value;
    } else {
        fromUnit = 'meter';
    }

    if (unitTo && unitTo.value) {
        toUnit = unitTo.value;
    } else {
        toUnit = 'meter';
    }

    if (valueInput && valueInput.value !== '') {
        valueInNum = parseFloat(valueInput.value);
        if (isNaN(valueInNum)) {
            result.textContent = 'Result: Enter a number';
            return;
        }
    } else {
        valueInNum = 0;
    }

    // find how many meters per 1 unit
    let metersFrom = units[fromUnit];
    let metersTo = units[toUnit];

    if (metersFrom === undefined || metersTo === undefined) {
        result.textContent = 'Result: unit not found';
        return;
    }

    // Convert: value * meters from -> meters; then divide by meters per "to"
    let valueInMeters = valueInNum * metersFrom;
    let converted = valueInMeters / metersTo;

    let rounded = roundTwo(converted);
    result.style.display = 'block';
    result.textContent = rounded + ' ' + toUnit;
}

if (unitFrom) { unitFrom.addEventListener('change', computeAndShow); };
if (unitTo) { unitTo.addEventListener('change', computeAndShow); };
if (valueInput) { valueInput.addEventListener('input', computeAndShow); };