import { initConverter } from "./converterUtility.js";

// Health converter - Weight conversions

const healthUnits = {
  pound: 1,
  kilogram: 0.4536,
  ounce: 16,
  gram: 453.592,
};

initConverter(healthUnits, "pound");
