import Select1 from '../Select1';
import { IPopulation } from './../../interfaces/Population';

export default class Select1Tournament2<Entity> extends Select1<Entity> {
  public select(pop: IPopulation) {
    const firstPick = this.randomWithFitness(pop);
    const secondPick = this.randomWithFitness(pop);

    return this.optimize(firstPick[1], secondPick[1])
      ? firstPick[0]
      : secondPick[0];
  }
}
