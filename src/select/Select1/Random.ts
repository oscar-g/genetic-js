import IPopulation from "../../population/IPopulation";
import Select1Selector from "../Select1Selector";

export class Random<Entity> extends Select1Selector<Entity> {
  public select(pop: IPopulation) {
    return this.randomWithFitness(pop)[0];
  }
}

export default Random;
