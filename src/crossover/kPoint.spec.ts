import { expect } from "chai";

import Genome from "../population/Genome";
import { randomSetFromSet } from "../util";
import kPoint from "./kPoint";

describe("crossover/kPoint (k = 2)", () => {
  it("returns genomes of the same length as the parents", () => {
    const g1: Genome = randomSetFromSet(["a", "a"], 10);
    const g2: Genome = randomSetFromSet(["x", "x"], 10);
    const [a, b] = kPoint(2)(g1, g2, g1.length);

    expect(a.length).eq(10);
    expect(b.length).eq(10);
  });

  it("works correctly");
});
