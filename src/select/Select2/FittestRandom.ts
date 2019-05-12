import IPopulation from "../../population/IPopulation";
import Fittest from "../Select1/Fittest";
import Select2Selector from "../Select2Selector";

export class FittestRandom<Entity> extends Select2Selector<Entity> {
  public init() {
    this.select1 = new Fittest(this.state, this.optimize);
  }

  public select(pop: IPopulation): [Entity, Entity] {
    return [
      this.select1.select(pop),
      this.randomWithFitness(pop)[0],
    ];
  }
}

export default FittestRandom;
