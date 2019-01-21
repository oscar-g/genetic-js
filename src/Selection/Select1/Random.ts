import Select1 from '../Select1';
import { IPopulation } from './../../interfaces/Population';

export default class Select1Random<Entity> extends Select1<Entity> {
  public select(pop: IPopulation) {
    return this.randomWithFitness(pop)[0];
  }
}
