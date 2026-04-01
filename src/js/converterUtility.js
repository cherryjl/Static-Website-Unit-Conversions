// Shared converter utility - handles all conversion logic

// Rounds a number to two decimal places, removing trailing zeros.
function roundTwo(n) {
  if (isNaN(n)) {
    return "NaN";
  }

  let rounded = Math.round(n * 100) / 100;

  let s = String(rounded);
  if (s.indexOf(".") !== -1) {
    while (s.charAt(s.length - 1) === "0") {
      s = s.slice(0, -1);
    }
    if (s.charAt(s.length - 1) === ".") {
      s = s.slice(0, -1);
    }
  }
  return s;
}

// Initialize converter with units and default unit
function initConverter(units, defaultUnit) {
  const unitFrom = document.getElementById("unitFrom");
  const unitTo = document.getElementById("unitTo");
  const valueInput = document.getElementById("valueIn");
  const result = document.getElementById("result");

  function conversionSolver() {
    let fromUnit = defaultUnit;
    let toUnit = defaultUnit;
    let valueIn = 0;

    if (unitFrom && unitFrom.value) {
      fromUnit = unitFrom.value;
    }

    if (unitTo && unitTo.value) {
      toUnit = unitTo.value;
    }

    if (valueInput && valueInput.value !== "") {
      valueIn = parseFloat(valueInput.value);
      if (isNaN(valueIn)) {
        result.textContent = "Result: Enter a number";
        return;
      }
    }

    let unitsFrom = units[fromUnit];
    let unitsTo = units[toUnit];

    if (unitsFrom === undefined || unitsTo === undefined) {
      result.textContent = "Result: unit not found";
      return;
    }

    let converted = valueIn * (unitsTo / unitsFrom);

    let rounded = roundTwo(converted);
    result.style.display = "block";
    result.textContent = rounded + " " + toUnit;
  }

  // Attach event listeners
  if (unitFrom) unitFrom.addEventListener("change", conversionSolver);
  if (unitTo) unitTo.addEventListener("change", conversionSolver);
  if (valueInput) valueInput.addEventListener("input", conversionSolver);
}
