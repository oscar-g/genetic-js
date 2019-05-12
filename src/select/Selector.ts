import IState from "../genetic/IState";
import Optimizer from "../optimize/Optimizer";
import Population from "../population/Population";
import { randomInt } from "../util";
import ISelector from "./ISelector";

/**
 * Selects  (entity, fitness) tuples from Populatino classes
 */
export abstract class Selector<Entity> implements ISelector<Entity> {

  constructor(
    public readonly state: IState,
    public readonly optimize: Optimizer,
  ) {}
  public abstract select(pop: Population<Entity>): Entity | [Entity, Entity];

  protected randomWithFitness(pop: Population<Entity>): [Entity, number] {
    const x = pop.entities[randomInt(pop.stats.size)];

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

export default Selector;
