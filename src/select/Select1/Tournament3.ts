import IPopulation from "../../population/IPopulation";
import Select1Selector from "../Select1Selector";

export class Tournament3<Entity> extends Select1Selector<Entity> {
  public select(pop: IPopulation) {
    const firstPick = this.randomWithFitness(pop);
    const secondPick = this.randomWithFitness(pop);
    let best = this.optimize(firstPick[1], secondPick[1]) ? firstPick : secondPick;
    const thirdPick = this.randomWithFitness(pop);

    best = this.optimize(best[1], thirdPick[1]) ? best : thirdPick;

    return best[0];
  }
}

export default Tournament3;
