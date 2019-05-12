import CrossoverOperator from "../crossover/CrossoverOperator";
import Mutator from "../mutate/Mutator";
import Optimizer from "../optimize/Optimizer";
import Genome from "../population/Genome";
import { ISelect1Selector, ISelect2Selector } from "../select/ISelector";
import Encoder from "../util/Encoder";
import IConfiguration from "./IConfiguration";
import IState from "./IState";

/**
 * The Genetic Algorithm
 */
export interface IGenetic<Entity> {
  state: IState;
  configuration: IConfiguration;

  /* these should be pure functions */
  select1: ISelect1Selector<Entity>;
  select2: ISelect2Selector<Entity>;
  optimize: Optimizer;
  crossover: CrossoverOperator;
  mutate: Mutator;
  toGenome: Encoder<Entity, Genome>;
  fromGenome: Encoder<Genome, Entity>;

  seed(): Entity;
  fitness(entity: Entity): Promise<number>;

  evolve(): Promise<this>;
  notify(): Promise<void>;

  shouldContinue(): boolean;
  shouldMutate(): boolean;
  shouldCrossover(populationSize: number): boolean;
}

export default IGenetic;
