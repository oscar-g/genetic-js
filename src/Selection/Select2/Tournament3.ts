import S1Tournament3 from '../Select1/Tournament3';
import { Select2 } from '../Select2';

export default class Select2Tournament3<Entity> extends Select2<Entity> {
  public init() {
    this.select1 = new S1Tournament3(this.state, this.optimize);
  }
}
