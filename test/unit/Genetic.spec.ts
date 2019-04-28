/**
 * Update these
 */
describe.skip('class: Genetic', () => {
  describe('initial state (instantiated, before evolution)', () => {
    it('starts at generation 0');
    it('has empty population');
  });

  describe('method: evolve', () => {
    
    describe('with configured maximum iterations I', () => {

      describe('first time run (generation = 0)', () => {
        it('should generate a random population');
        it('set generation to 1');
      });

      it('increases generation number');
      it('creates and stores new entities');
      it('resets selection pointers');
      it('calculates the fitness of each entity');
      it('sorts entities using configured opimization function');
      it('stores the new population');
      it('emits an event with state data');
      it('loops until the state generation counter reaches the configured maximum number of iterations');
    });
  });

  describe('method: shouldContinue', () => {
    it('returns false when the maximum number of generations have been evolved');
  });

  describe('method: shouldMutate', () => {
    it('flips coin with configured mutation probability');
  });

  describe('method: shouldCrossover', () => {
    it('flips coin with configured crossover probability');
    describe('because crossover results in two children', () => {
      it('ensures provided population size will not exceed configured population size, after crossover');
    });
  });

  describe('method: getEntities', () => {
    describe('initial state (generation = 0)', () => {
      it('seeds random entities');
    });

    describe('evolved states (generation > 0)', () => {
      it('seeds mutated entities');
    });
  });

  describe('method: seedInitialRandomEntities', () => {
    describe('with configured population size P', () => {
      it('returns P entities');
      it('calls seed function P times');
    });
  });

  describe('method: seedFromLastPopulation', () => {
    it('returns a mutated population, based off the last evolved generation');

    describe('when configured with "fittest always survives"', () => {
      it('includes the fittest entity in the returned population');
    });

    describe('with configured population size P', () => {
      it('returns P entities');
    });
  });

  describe('method: storePopulation', () => {
    describe('with current state generation G', () => {
      it('stores the provided population in generation G');
    });
  });

  describe('method: initSelect', () => {
    it('initializes \'select1\' Selection class');
    it('initializes \'select2\' Selection class');
    it('initializes the \'fittest\' Selection class');
  });
});
