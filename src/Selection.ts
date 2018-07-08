import { Genetic } from "./Genetic";

export type Population<Entity> = {
  fitness: number;
  entity: Entity;
}[];

export type SingleSelection<Entity> = (pop: Population<Entity>) => Entity;

export type PairWiseSelection<Entity> = (
  pop: Population<Entity>
) => [Entity, Entity];

export const Select1 = {
  Tournament2: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): Entity {
    let n = pop.length;
    let a = pop[Math.floor(Math.random() * n)];
    let b = pop[Math.floor(Math.random() * n)];
    return this.optimize(a.fitness, b.fitness) ? a.entity : b.entity;
  },
  Tournament3: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): Entity {
    let n = pop.length;
    let a = pop[Math.floor(Math.random() * n)];
    let b = pop[Math.floor(Math.random() * n)];
    let c = pop[Math.floor(Math.random() * n)];
    let best = this.optimize(a.fitness, b.fitness) ? a : b;
    best = this.optimize(best.fitness, c.fitness) ? best : c;
    return best.entity;
  },
  Fittest: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): Entity {
    return pop[0].entity;
  },
  Random: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): Entity {
    return pop[Math.floor(Math.random() * pop.length)].entity;
  },
  RandomLinearRank: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): Entity {
    this.internalGenState.rlr = this.internalGenState.rlr || 0;
    return pop[
      Math.floor(
        Math.random() * Math.min(pop.length, this.internalGenState.rlr++)
      )
    ].entity;
  },
  Sequential: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): Entity {
    this.internalGenState.seq = this.internalGenState.seq || 0;
    return pop[this.internalGenState.seq++ % pop.length].entity;
  },
};

export const Select2 = {
  Tournament2: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): [Entity, Entity] {
    return [
      Select1.Tournament2.call(this, pop),
      Select1.Tournament2.call(this, pop),
    ];
  },
  Tournament3: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): [Entity, Entity] {
    return [
      Select1.Tournament3.call(this, pop),
      Select1.Tournament3.call(this, pop),
    ];
  },
  Random: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): [Entity, Entity] {
    return [Select1.Random.call(this, pop), Select1.Random.call(this, pop)];
  },
  RandomLinearRank: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): [Entity, Entity] {
    return [
      Select1.RandomLinearRank.call(this, pop),
      Select1.RandomLinearRank.call(this, pop),
    ];
  },
  Sequential: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): [Entity, Entity] {
    return [
      Select1.Sequential.call(this, pop),
      Select1.Sequential.call(this, pop),
    ];
  },
  FittestRandom: function<Entity>(
    this: Genetic<Entity, any>,
    pop: Population<Entity>
  ): [Entity, Entity] {
    return [Select1.Fittest.call(this, pop), Select1.Random.call(this, pop)];
  },
};
