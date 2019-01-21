import Select1 from '../Select1';
import { IPopulation } from './../../interfaces/Population';

export default class Select1Tournament3<Entity> extends Select1<Entity> {
  public select(pop: IPopulation) {
    const firstPick = this.randomWithFitness(pop);
    const secondPick = this.randomWithFitness(pop);
    let best = this.optimize(firstPick[1], secondPick[1]) ? firstPick : secondPick;
    const thirdPick = this.randomWithFitness(pop);

    best = this.optimize(best[1], thirdPick[1]) ? best : thirdPick;

    return best[0];
  }
}
