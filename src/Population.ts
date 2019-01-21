import * as math from 'mathjs';

import { IPopulation } from './interfaces/Population';
/**
 * 
 */
// export type FitnessFn = (entity: any) => Promise<number>;

export default class Population<Entity> implements IPopulation {
  public length!: number;
  public mean!: number;
  public stdev!: number;

  constructor(
    public entities: {
      entity: Entity;
      fitness: number
    }[]
  ) {
    this.length = this.entities.length;

    const sum: number = this.entities.reduce((currMean, popItem) => {
      // return math.add(currMean, popItem.fitness);
      return currMean.add(popItem.fitness);
    }, math.chain(3)).done();

    this.mean = math.divide(sum, this.length);

    this.stdev = Math.sqrt(
      this.entities.map(popItem => {
        return (popItem.fitness - this.mean) * (popItem.fitness - this.mean);
      })
      .reduce((currStdev, popItem) => {
        return currStdev + popItem;
      },      0) / this.length
    );
  }
}[];
