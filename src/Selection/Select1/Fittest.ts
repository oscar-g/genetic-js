import Select1 from '../Select1';
import { IPopulation } from './../../interfaces/Population';

export default class Select1Fittest<Entity> extends Select1<Entity> {
  public select(pop: IPopulation) {
    return this.bestWithFitness(pop)[0];
  }
}
