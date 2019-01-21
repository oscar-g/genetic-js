import Select1 from '../Select1';
import { IPopulation } from './../../interfaces/Population';
import { randomInt } from '../../util';

export default class Select1RandomLinearRank<Entity> extends Select1<Entity> {
  public select(pop: IPopulation) {
    const i = Math.min(pop.length, this.state.incSelection('rlr'));
    return pop.entities[ randomInt(i) ].entity;
  }
}
