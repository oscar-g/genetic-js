import IPopulation from "../../population/IPopulation";
import Select1Selector from "../Select1Selector";

export class Tournament2<Entity> extends Select1Selector<Entity> {
  public select(pop: IPopulation) {
    const firstPick = this.randomWithFitness(pop);
    const secondPick = this.randomWithFitness(pop);

    return this.optimize(firstPick[1], secondPick[1])
      ? firstPick[0]
      : secondPick[0];
  }
}

export default Tournament2;
