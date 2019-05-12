import { expect } from "chai";
import * as sinon from "sinon";
import { getGA, TestGA } from '../../test/fixtures';

const testMethodCallCount = (ga, subject, method, expectedCount, op = "eq") => {
  sinon.spy((subject || ga), method);

  return ga.evolve().then(() => {
    expect((subject || ga)[method].callCount)[op](expectedCount);
    (subject || ga)[method].restore();

    return;
  });
};

/**
 * Tests the overall structure and flow of the algorithm
 */
describe("class: Genetic", () => {
  let ga: TestGA;

  beforeEach(() => {
    ga = getGA();
  });

  describe("initial state (freshly instantiated)", () => {
    it("starts at generation 0", () => {
      expect(ga.state.generation).eq(0);
    });
    it("has empty population", () => {
      expect(Object.keys(ga.populations)).empty;
    });
  });

  describe("method: evolve", () => {
    describe("while state.generation approaches configuration.iterations", () => {
      afterEach(() => sinon.restore());

      it("increases the generation number", (done) => {
        testMethodCallCount(ga, ga.state, "incGen", ga.configuration.iterations).then(done).catch(done);
      });

      it("seeds new entities, once", (done) => {
        testMethodCallCount(ga, null, "seedInitialRandomEntities", 1)
          .then(done).catch(done);
      });

      it("seeds from the last population", (done) => {
        testMethodCallCount(ga, null, "seedFromLastPopulation", ga.configuration.iterations - 1)
          .then(done).catch(done);
      });

      it("resets selection pointers", (done) => {
        testMethodCallCount(ga, ga.state, "resetSelection", ga.configuration.iterations).then(done).catch(done);
      });

      it("calculates the fitness of each entity", (done) => {
        /**
         * @todo do not assume every generation has fully-stocked population
         */

        testMethodCallCount(ga, null, "fitness", ga.configuration.iterations * ga.configuration.popSize).then(done).catch(done);
      });

      it("sorts entities using configured opimization function", (done) => {
        testMethodCallCount(ga, null, "optimize", 0, "gt").then(done).catch(done);
      });

      it("emits events on state changes");
      it("loops until the generation counter reaches the maximum number of iterations");
      it("returns an asynchronous call to itself");
    });

    describe("when state.generation reaches configuration.iterations", () => {
      it("stops recursion by returning the class instance");

      describe("subsequent calls to method", () => {
        it("return the class instance", (done) => {
          ga.evolve().then((g) => {
            expect(g).instanceOf(TestGA);

            return g.evolve();
          })
          .then((g) => {
            expect(g).instanceOf(TestGA);

            done();
          })
          .catch(done);
        });
      });
    });
  });

  describe("method: shouldContinue", () => {
    it("returns false when the maximum number of generations have been evolved");
  });

  describe("method: shouldMutate", () => {
    it("flips coin with configured mutation probability");
  });

  describe("method: shouldCrossover", () => {
    it("flips coin with configured crossover probability");
    describe("because crossover results in two children", () => {
      it("ensures provided population size will not exceed configured population size, after crossover");
    });
  });

  describe("method: getEntities", () => {
    describe("initial state (generation = 0)", () => {
      it("seeds random entities");
    });

    describe("evolved states (generation > 0)", () => {
      it("seeds mutated entities");
    });
  });

  describe("method: seedInitialRandomEntities", () => {
    describe("with configured population size P", () => {
      it("returns P entities");
      it("calls seed function P times");
    });
  });

  describe("method: seedFromLastPopulation", () => {
    it("returns a mutated population, based off the last evolved generation");

    describe('when configured with "fittest always survives"', () => {
      it("includes the fittest entity in the returned population");
    });

    describe("with configured population size P", () => {
      it("returns P entities");
    });
  });

  describe("method: storePopulation", () => {
    describe("with current state generation G", () => {
      it("stores the provided population in generation G");
    });
  });

  describe("method: initSelect", () => {
    it("initializes 'select1' Selection class");
    it("initializes 'select2' Selection class");
    it("initializes the 'fittest' Selection class");
  });
});
