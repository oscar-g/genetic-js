import {Tournament2 as S1Tournament2} from "../Select1/Tournament2";
import Select2Selector from "../Select2Selector";

export class Tournament2<Entity> extends Select2Selector<Entity> {
  public init() {
    this.select1 = new S1Tournament2(this.state, this.optimize);
  }
}

export default Tournament2;
