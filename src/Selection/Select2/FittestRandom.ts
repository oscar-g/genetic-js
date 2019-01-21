import { IPopulation } from '../../interfaces/Population';
import { Select2 } from '../Select2';
import S1Fittest from '../Select1/Fittest';

export default class Select2FittestRandom<Entity> extends Select2<Entity> {
  public init() {
    this.select1 = new S1Fittest(this.state, this.optimize);
  }

  public select(pop: IPopulation): [Entity, Entity] {
    return [
      this.select1.select(pop),
      this.randomWithFitness(pop)[0]
    ];
  }
}
