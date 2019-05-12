import IPopulation from "../../population/IPopulation";
import Select1Selector from "../Select1Selector";

export class Fittest<Entity> extends Select1Selector<Entity> {
  public select(pop: IPopulation) {
    return this.bestWithFitness(pop)[0];
  }
}

export default Fittest;
