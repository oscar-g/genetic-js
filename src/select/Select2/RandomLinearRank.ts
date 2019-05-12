import {RandomLinearRank as S1RandomLinearRank} from "../Select1/RandomLinearRank";
import Select2Selector from "../Select2Selector";

export class RandomLinearRank<Entity> extends Select2Selector<Entity> {
  public init() {
    this.select1 = new S1RandomLinearRank(this.state, this.optimize);
  }
}

export default RandomLinearRank;
