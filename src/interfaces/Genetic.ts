import { IConfiguration } from './Configuration';
import { IGeneticState } from './GeneticState';
import { ISelect1, ISelect2 } from './Selector';
import { Encoder } from '../Encoder';
import { OptimizeFun, CrossoverFun, MutationFun, Genome } from '../types';

export { Genome } from './../types';

/**
 * The Genetic Algorithm
 */
export interface IGenetic<Entity> {
  state: IGeneticState;
  configuration: IConfiguration;

  /* these should be pure functions */
  select1: ISelect1<Entity>;
  select2: ISelect2<Entity>;
  optimize: OptimizeFun;
  crossover: CrossoverFun;
  mutate: MutationFun;
  toGenome: Encoder<Entity, Genome>;
  fromGenome: Encoder<Genome, Entity>;

  seed(): Entity;
  fitness(entity: Entity): Promise<number>;

  evolve(): Promise<IGenetic<Entity>>;
  notify(): Promise<void>;


  shouldContinue(): boolean;
  shouldMutate(): boolean;
  shouldCrossover(populationSize: number): boolean;
}
