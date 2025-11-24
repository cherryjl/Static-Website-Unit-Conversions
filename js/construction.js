// Dynamic converter for the construction page

// Unites based on a standard meter.
let units = {
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    meter: 1,
    centimeter: 0.01
};

// Rounds a number to two decimal places, removing trailing zeros.
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


// Selectors and variables.
let unitFrom = document.getElementById('unitFrom');
let unitTo = document.getElementById('unitTo');
let valueInput = document.getElementById('valueIn');
let result = document.getElementById('result');


// Function to solve and display conversion.
function conversionSolver() {

    // Starting local variables.
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

    // Check if units are valid.
    if (metersFrom === undefined || metersTo === undefined) {
        result.textContent = 'Result: unit not found';
        return;
    }

    // Convert: value * meters from -> meters; then divide by meters per "to"
    let valueInMeters = valueInNum * metersFrom;
    let converted = valueInMeters / metersTo;

    // Rounds the value, unhide result, and displays it.
    let rounded = roundTwo(converted);
    result.style.display = 'block';
    result.textContent = rounded + ' ' + toUnit;
}

// Event listeners that trigger conversion on change/input.
unitFrom.addEventListener('change', conversionSolver);
unitTo.addEventListener('change', conversionSolver);
valueInput.addEventListener('input', conversionSolver);