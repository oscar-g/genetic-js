import { Genetic } from './../../src/Genetic';
import { randomSetFromSet } from './../../src/util';

export interface Model {
  id: number,
  genome: number[];
}

export default class TestGA extends Genetic<Model, null> {
  seed() {
    return {
      id: new Date().getTime(),
      genome: randomSetFromSet([0, 1], this.configuration.chromosomeSize),
    };
  }

  fitness(entity: Model) {
    return Promise.resolve(entity.genome.reduce((a, b) => a + b, 0));
  }

  toGenome(entity: Model){
    return entity.genome;
  }

  fromGenome = (genome: number[]) => ({
    id: new Date().getTime(),
    genome, 
  });
}

// const ga = new Test(config, null);

// ga.evolve().then(x => {
//   console.info('GA DONE!', x);
// }, x => {
//   console.error('GA ERROR:', x);
// });
