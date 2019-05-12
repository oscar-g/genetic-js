import { expect } from "chai";

import Min from "./Min";

describe("optimize/Min", () => {
  it("compares input values correctly", () => {
    expect(Min(1, 2)).eq(true);
		  expect(Min(2, 1)).eq(false);
    expect(Min(2, 2)).eq(false);
  });
});
