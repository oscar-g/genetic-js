import * as ss from 'simple-statistics';

import { IPopulation } from './interfaces/Population';
import { IStats } from './interfaces/Stats';

/**
 * 
 */
// export type FitnessFn = (entity: any) => Promise<number>;

export default class Population<Entity> implements IPopulation {
  public stats!: IStats;

  constructor(
    public entities: {
      entity: Entity;
      fitness: number
    }[]
  ) {
    const f = this.entities.map(_ => _.fitness);

    this.stats = {
      size: f.length,
      min: ss.min(f),
      max: ss.max(f),
      mean: ss.mean(f),
      stdev: ss.standardDeviation(f),
    };
  }
}[];
