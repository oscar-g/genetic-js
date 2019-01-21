import S1Tournament2 from '../Select1/Tournament2';
import { Select2 } from '../Select2';

export default class Select2Tournament2<Entity> extends Select2<Entity> {
  public init() {
    this.select1 = new S1Tournament2(this.state, this.optimize);
  }
}
