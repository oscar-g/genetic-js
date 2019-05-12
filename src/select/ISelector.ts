import IState from "../genetic/IState";
import Optimizer from "../optimize/Optimizer";
import IPopulation from "../population/IPopulation";

/**
 * generic selector
 */
export interface ISelector<Entity> {
  state: IState;
  optimize: Optimizer;

  select(pop: IPopulation): Entity | [Entity, Entity];
}

export default ISelector;

export interface ISelect1Selector<Entity> extends ISelector<Entity> {
  select(pop: IPopulation): Entity;
}

export interface ISelect2Selector<Entity> extends ISelector<Entity> {
  select1: ISelect1Selector<Entity>;
  select(pop: IPopulation): [Entity, Entity];
}
