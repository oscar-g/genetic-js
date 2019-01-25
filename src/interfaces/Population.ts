import { IStats } from './Stats';

/**
 * Models a population of entities
 */
export interface IPopulation {
  entities: {
    /* tslint:disable:no-any */
    entity: any;
    fitness: number;
  }[];

  stats: IStats;
}
