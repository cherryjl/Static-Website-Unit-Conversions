// Dynamic converter for the construction page

let units = {
    teaspoon: 768,
    tablespoon: 256,
    cup: 16,
    gallon: 1,
    pint: 8,
    quart: 4,
    ounces: 128
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
    let fromUnit = 'gallon';
    let toUnit = 'gallon';
    let valueIn = 0;

    if (unitFrom && unitFrom.value) {
        fromUnit = unitFrom.value;
    } else {
        fromUnit = 'gallon';
    }

    if (unitTo && unitTo.value) {
        toUnit = unitTo.value;
    } else {
        toUnit = 'gallon';
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

    // find how many gallons per 1 unit
    let gallonsFrom = units[fromUnit];
    let gallonsTo = units[toUnit];

    if (gallonsFrom === undefined || gallonsTo === undefined) {
        result.textContent = 'Result: unit not found';
        return;
    }

    let converted = valueIn * (gallonsTo / gallonsFrom);

    let rounded = roundTwo(converted);
    result.style.display = 'block';
    result.textContent = rounded + ' ' + toUnit;
};

if (unitFrom) { unitFrom.addEventListener('change', computeAndShow); };
if (unitTo) { unitTo.addEventListener('change', computeAndShow); };
if (valueInput) { valueInput.addEventListener('input', computeAndShow); };