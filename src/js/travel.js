import { initConverter } from "./converterUtility.js";

// Travel converter - Speed conversions

const travelUnits = {
  mph: 1,
  kmh: 1.60934,
};

initConverter(travelUnits, "mph");
