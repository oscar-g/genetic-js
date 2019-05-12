import {Random as S1Random} from "../Select1/Random";
import Select2Selector from "../Select2Selector";

export class Random<Entity> extends Select2Selector<Entity> {
  public init() {
    this.select1 = new S1Random(this.state, this.optimize);
  }
}

export default Random;
