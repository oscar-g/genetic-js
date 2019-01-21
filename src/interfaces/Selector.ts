import { IGeneticState } from './GeneticState';
import { IPopulation } from '../interfaces/Population';
import { OptimizeFun } from '../types';

/**
 * Select
 */
export interface ISelector<Entity> {
  state: IGeneticState;
  optimize: OptimizeFun;

  select(pop: IPopulation): Entity | [Entity, Entity];
}

export interface ISelect1<Entity> extends ISelector<Entity> {
  select(pop: IPopulation): Entity;
}

export interface ISelect2<Entity> extends ISelector<Entity> {
  select1: ISelect1<Entity>;
  select(pop: IPopulation): [Entity, Entity];
}
