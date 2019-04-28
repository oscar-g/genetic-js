import { Genetic } from './../../src/Genetic';
import { randomSetFromSet, randomInt } from './../../src/util';
import { IConfiguration } from '../../src/interfaces/Configuration';

export interface Model {
  id: number,
  genome: number[];
}

export default class TestGA extends Genetic<Model, null> {
  seed() {
    return {
      id: randomInt(1000),
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

export const configs = {
  default: {
    crossover: 90,
    mutation: 10,
    iterations: 10,
    chromosomeSize: 5,
    popSize: 30,
  },
};

export const getGA = (conf?: Partial<IConfiguration>) => {
  return new TestGA(Object.assign({}, configs.default, conf || {}));
}
