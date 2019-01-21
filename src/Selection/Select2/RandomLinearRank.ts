import S1RandomLinearRank from '../Select1/RandomLinearRank';
import { Select2 } from '../Select2';

export default class Select2RandomLinearRank<Entity> extends Select2<Entity> {
  public init() {
    this.select1 = new S1RandomLinearRank(this.state, this.optimize);
  }
}
