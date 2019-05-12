import IPopulation from "../../population/IPopulation";
import { randomInt } from "../../util";
import Select1Selector from "../Select1Selector";

export class RandomLinearRank<Entity> extends Select1Selector<Entity> {
  public select(pop: IPopulation) {
    const i = Math.min(pop.stats.size, this.state.incSelection("rlr"));
    return pop.entities[ randomInt(i) ].entity;
  }
}

export default RandomLinearRank;
