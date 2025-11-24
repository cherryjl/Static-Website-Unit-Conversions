// Dynamic converter for the construction page

let units = {
    pound: 1,
    kilogram: 0.4536
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
    let fromUnit = 'pound';
    let toUnit = 'pound';
    let valueIn = 0;

    if (unitFrom && unitFrom.value) {
        fromUnit = unitFrom.value;
    } else {
        fromUnit = 'pound';
    }

    if (unitTo && unitTo.value) {
        toUnit = unitTo.value;
    } else {
        toUnit = 'pound';
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

    // find how many pounds per 1 unit
    let poundsFrom = units[fromUnit];
    let poundsTo = units[toUnit];

    if (poundsFrom === undefined || poundsTo === undefined) {
        result.textContent = 'Result: unit not found';
        return;
    }

    let converted = valueIn * (poundsTo / poundsFrom);

    let rounded = roundTwo(converted);
    result.style.display = 'block';
    result.textContent = rounded + ' ' + toUnit;
};

if (unitFrom) { unitFrom.addEventListener('change', computeAndShow); };
if (unitTo) { unitTo.addEventListener('change', computeAndShow); };
if (valueInput) { valueInput.addEventListener('input', computeAndShow); };