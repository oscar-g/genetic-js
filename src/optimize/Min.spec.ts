import { expect } from 'chai';

import Min from './Min';

describe("optimize/Min", function() {
  it("compares input values correctly", function () {
    expect(Min(1,2)).eq(true);
		expect(Min(2,1)).eq(false);
    expect(Min(2,2)).eq(false);
  });
});
