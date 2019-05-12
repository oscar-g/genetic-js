import IState from "../genetic/IState";
import Optimizer from "../optimize/Optimizer";
import IPopulation from "../population/IPopulation";
import { ISelect1Selector, ISelect2Selector } from "./ISelector";
import Selector from "./Selector";

/**
 * abstract class for two-item selector
 */
export abstract class Select2Selector<Entity> extends Selector<Entity> implements ISelect2Selector<Entity> {
  public select1!: ISelect1Selector<Entity>;

  public constructor(state: IState, optimize: Optimizer) {
    super(state, optimize);
    this.init();
  }

  public abstract init(): void;

  public select(pop: IPopulation): [Entity, Entity] {
    return [
      this.select1.select(pop),
      this.select1.select(pop),
    ];
  }
}

export default Select2Selector;
