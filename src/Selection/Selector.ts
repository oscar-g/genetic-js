import { IGeneticState } from './../interfaces/GeneticState';
import { ISelector } from './../interfaces/Selector';

import Population from './../Population';

import { randomInt } from '../util';
import { OptimizeFun } from '../types';


/**
 * Selects  (entity, fitness) tuples from Populatino classes
 */
export abstract class Selector<Entity> implements ISelector<Entity> {
  public abstract select(pop: Population<Entity>): Entity | [Entity, Entity];

  constructor(
    public readonly state: IGeneticState,
    public readonly optimize: OptimizeFun
  ) {}

  protected randomWithFitness(pop: Population<Entity>): [Entity, number] {
    const x = pop.entities[randomInt(pop.length)];

    return [x.entity, x.fitness];
  }

  protected bestWithFitness(pop: Population<Entity>): [Entity, number] {
    const sorted = pop.entities.sort((a, b) => {
      return this.optimize(a.fitness, b.fitness) ? 1 : 0;
    });

    if (sorted.length) {
      const { fitness, entity } = sorted[0];

      return [entity, fitness];
    } else {
      const { fitness, entity } = pop.entities[0];

      return [entity, fitness];
    }
  }
}
