import Select1 from '../Select1';
import { IPopulation } from './../../interfaces/Population';

export default class Select1Sequential<Entity> extends Select1<Entity> {
  public select(pop: IPopulation) {
    return pop.entities[this.state.incSelection('seq') % pop.length].entity;
  }
}
