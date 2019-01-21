import S1Sequential from '../Select1/Sequential';
import { Select2 } from '../Select2';

export default class Select2Sequential<Entity> extends Select2<Entity> {
  public init() {
    this.select1 = new S1Sequential(this.state, this.optimize);
  }
}
