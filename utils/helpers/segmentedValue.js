import { range } from "lodash";

/* eslint-disable no-case-declarations */
const segmentedValue = (highestValue) => {
  const divider = Math.floor(highestValue / 4);

  return range(4).map((_, i) => highestValue - divider * (i + 1));
};

export default segmentedValue;
