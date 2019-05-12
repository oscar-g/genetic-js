import { expect } from "chai";
import sinon from "sinon";

import Genome from "../population/Genome";
import { randomSetFromSet } from "../util";
import * as Utils from "../util";
import Simple from "./Simple";

describe("crossover/Simple", () => {
  it("returns genomes of the same length as the parents", () => {
    const g1: Genome = randomSetFromSet([0, 1], 10);
    const g2: Genome = randomSetFromSet([0, 1], 10);

    const [a, b] = Simple(g1, g2, g1.length);

    expect(a.length).eq(10);
    expect(b.length).eq(10);
  });

  it("works correctly", () => {
    const g1: Genome = randomSetFromSet([1], 5);
    const g2: Genome = randomSetFromSet([0], 5);

    const s = sinon.stub(Utils, "randomInt").returns(3);

    const [a, b] = Simple(g1, g2, g1.length);

    expect(a).deep.eq([1, 1, 1, 0, 0]);
    expect(b).deep.eq([0, 0, 0, 1, 1]);

    s.restore();
  });
});
