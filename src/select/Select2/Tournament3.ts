import {Tournament3 as S1Tournament3} from "../Select1/Tournament3";
import Select2Selector from "../Select2Selector";

export class Tournament3<Entity> extends Select2Selector<Entity> {
  public init() {
    this.select1 = new S1Tournament3(this.state, this.optimize);
  }
}

export default Tournament3;
