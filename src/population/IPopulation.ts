import IStats from "./IStats";

/**
 * Models a population of entities
 */
export interface IPopulation {
  entities: {
    entity: any;
    fitness: number;
  }[];

  stats: IStats;
}

export default IPopulation;
