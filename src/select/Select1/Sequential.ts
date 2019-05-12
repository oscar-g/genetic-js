import IPopulation from "../../population/IPopulation";
import Select1Selector from "../Select1Selector";

export class Sequential<Entity> extends Select1Selector<Entity> {
  public select(pop: IPopulation) {
    return pop.entities[this.state.incSelection("seq") % pop.stats.size].entity;
  }
}

export default Sequential;
