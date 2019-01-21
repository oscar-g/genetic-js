/**
 * Models a population of entities
 */
export interface IPopulation {
  entities: {
    /* tslint:disable:no-any */
    entity: any;
    fitness: number;
  }[];
  length: number;

  /** @todo use IStats here */
  mean: number;
  stdev: number;
}
