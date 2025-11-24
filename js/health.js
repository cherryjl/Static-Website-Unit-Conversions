// Dynamic converter for the construction page

// Unites based on a standard pound.
let units = {
    pound: 1,
    kilogram: 0.4536
};

// Rounds a number to two decimal places, removing trailing zeros.
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

// Selectors and variables.
let unitFrom = document.getElementById('unitFrom');
let unitTo = document.getElementById('unitTo');
let valueInput = document.getElementById('valueIn');
let result = document.getElementById('result');

// Function to solve and display conversion.
function conversionSolver() {
    // Starting local variables.
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

    // Check if units are valid.
    if (poundsFrom === undefined || poundsTo === undefined) {
        result.textContent = 'Result: unit not found';
        return;
    }

    let converted = valueIn * (poundsTo / poundsFrom);

    // Rounds the value, unhide result, and displays it.
    let rounded = roundTwo(converted);
    result.style.display = 'block';
    result.textContent = rounded + ' ' + toUnit;
};

// Event listeners that trigger conversion on change/input.
unitFrom.addEventListener('change', conversionSolver);
unitTo.addEventListener('change', conversionSolver);
valueInput.addEventListener('input', conversionSolver);