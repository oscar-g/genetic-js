import {Sequential as S1Sequential} from "../Select1/Sequential";
import Select2Selector from "../Select2Selector";

export class Sequential<Entity> extends Select2Selector<Entity> {
  public init() {
    this.select1 = new S1Sequential(this.state, this.optimize);
  }
}

export default Sequential;
