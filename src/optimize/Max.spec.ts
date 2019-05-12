import { expect } from "chai";

import Max from "./Max";

describe("optimize/Max", () => {
  it("compares input values correctly", () => {
    expect(Max(1, 2)).eq(false);
    expect(Max(2, 1)).eq(true);
    expect(Max(2, 2)).eq(true);
  });
});
