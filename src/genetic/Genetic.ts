import Simple from "../crossover/Simple";
import { Noop } from "../mutate/Mutator";
import Max from "../optimize/Max";
import Optimizer from "../optimize/Optimizer";
import Genome from "../population/Genome";
import IPopulation from "../population/IPopulation";
import Population from "../population/Population";
import { ISelect1Selector, ISelect2Selector } from "../select/ISelector";
import Fittest from '../select/Select1/Fittest';
import { Tournament2 as Select1Tournament2 } from '../select/Select1/Tournament2';
import { Tournament2 as Select2Tournament2 } from '../select/Select2/Tournament2';
import { flip } from "../util";
import IConfiguration from "./IConfiguration";
import IGenetic from "./IGenetic";
import IState from "./IState";
import State from './State';

export const defaultConfiguration: IConfiguration = {
  crossover: 90,
  fittestAlwaysSurvives: true,
  iterations: 10,
  mutation: 20,
  popSize: 100,
  chromosomeSize: 10,
  enableNotification: true,
};

/**
 * Prototype for genetic Algorithm.
 */
export abstract class Genetic<Entity, UserData> implements IGenetic<Entity> {
  public readonly state!: IState;
  public readonly configuration!: IConfiguration;

  /** @see initSelect() */
  public select1!: ISelect1Selector<Entity>;
  public select2!: ISelect2Selector<Entity>;
  public selectFittest!: ISelect1Selector<Entity>;

  /** @see storePopulation() */
  public readonly populations: { [gen: number]: IPopulation } = {};

  /** @todo move all operators to the configuration */
  /** @todo "clone" operator */
  public readonly optimize = Max;
  public readonly crossover = Simple;
  public readonly mutate = Noop;
  public readonly select1Class: new (state: IState, optimize: Optimizer) => ISelect1Selector<Entity> = Select1Tournament2;
  public readonly select2Class: new (state: IState, optimize: Optimizer) => ISelect2Selector<Entity> = Select2Tournament2;

  /**
   * @todo check final config values, raise ArgumentError
   */
  constructor(
    configuration?: Partial<IConfiguration>,
    public readonly userData?: UserData,
  ) {
    this.configuration = { ...defaultConfiguration, ...configuration };
    this.state = new State([]);

    this.initSelect();

    return this;
  }

  public abstract seed(): Entity;
  public abstract fitness(entity: Entity): Promise<number>;
  public abstract toGenome(entity: Entity): Genome;
  public abstract fromGenome(genome: Genome): Entity;

  /**
   * Check if the loop should continue.
   */
  public shouldContinue() {
    return this.state.generation < this.configuration.iterations;
  }

  /**
   * Evolve the model until completion.
   *
   * this should be the only public function that modifies state
   */
  public async evolve(): Promise<this> {
    /**
     * Always check the stop condition before modifying state.
    */
    if (!this.shouldContinue()) {
      return Promise.resolve(this);
    }

    /**
     * Get entities randomly or by mutating the last gen
     */
    this.state.setEntities(this.getEntities());

    /** Bump generation counter */
    this.state.incGen();

    /**
     * Generate the Population class by calculating fitness on each entity
     *
     * @todo test error in fitness or sorting fuunction
     */
    const population = await Promise.all(this.state.entities.map(async (entity) => {
      const fitness = await this.fitness(entity);

      return { fitness, entity };
    })).then((unsortedEntities) => {
      /**
       * Sort with optimize function
       */
      const entities = unsortedEntities.sort((entityA, entityB) => {
        return this.optimize(entityA.fitness, entityB.fitness) ? -1 : 1;
      });
      return new Population(entities);
    });

    this.storePopulation(population);

    /** Reset state */
    this.state.resetSelection();

    await this.notify();

    return this.evolve.call(this);
  }

  public notify() {
    if (this.configuration.enableNotification === true) {
    }

    return Promise.resolve();
  }

  public shouldMutate() {
    return Math.random() <= this.configuration.mutation;
  }

  public shouldCrossover(populationSize: number) {
    return (populationSize + 2 < this.configuration.popSize) && flip(this.configuration.crossover);
  }

  ////

  private initSelect() {
    this.select1 = new this.select1Class(this.state, this.optimize);
    this.select2 = new this.select2Class(this.state, this.optimize);
    this.selectFittest = new Fittest(this.state, this.optimize);
  }

  private mutateOrNot(entity: Entity): Entity {
    if (this.shouldMutate()) {
      const g = this.toGenome(entity);

      return this.fromGenome(this.mutate(g));
    }

    return entity;
  }

  private getEntities(): Entity[] {
    if (this.state.generation < 1) {
      return this.seedInitialRandomEntities();
    } else {
      return this.seedFromLastPopulation();
    }
  }

  private seedInitialRandomEntities(): Entity[] {
    const entities: Entity[] = [];
    for (let currSeed = 0; currSeed < this.configuration.popSize; ++currSeed) {

      entities.push(this.seed());
    }

    return entities;
  }

  private seedFromLastPopulation(): Entity[] {
    const newPop: Entity[] = [];
    const $p = Object.keys(this.populations).pop() || 0;
    const pop = this.populations[<number>$p];

    if (this.configuration.fittestAlwaysSurvives) {
      // lets the best solution fall through
      newPop.push(this.selectFittest.select(pop));
    }

    while (newPop.length < this.configuration.popSize) {
      if (this.shouldCrossover(newPop.length)) {
        const [p1, p2] = this.select2.select(pop).map(this.toGenome);
        const entities: Entity[] = this.crossover(p1, p2, this.configuration.chromosomeSize)
          .map(this.fromGenome)
          .map(this.mutateOrNot.bind(this));

        newPop.push(...entities);
      } else {
        newPop.push(this.mutateOrNot(this.select1.select(pop)));
      }
    }

    return newPop;
  }

  private storePopulation(population: IPopulation): IPopulation {
    this.populations[this.state.generation] = population;

    return population;
  }
}

export default Genetic;
