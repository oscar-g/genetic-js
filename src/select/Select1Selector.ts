import IPopulation from "../population/IPopulation";
import { ISelect1Selector } from "./ISelector";
import Selector from "./Selector";

/**
 * abstract class for single-item selector
 */
export abstract class Select1Selector<Entity> extends Selector<Entity> implements ISelect1Selector<Entity> {
  public abstract select(pop: IPopulation): Entity;
}

export default Select1Selector;
