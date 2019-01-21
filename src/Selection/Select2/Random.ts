import S1Random from '../Select1/Random';
import { Select2 } from '../Select2';

export default class Select2Random<Entity> extends Select2<Entity> {
  public init() {
    this.select1 = new S1Random(this.state, this.optimize);
  }
}
