import {IGeneticState} from './../interfaces/GeneticState';
import {IPopulation} from './../interfaces/Population';
import { ISelect2 } from './../interfaces/Selector';
import { ISelect1 } from './../interfaces/Selector';
import { Selector } from './Selector';
import { OptimizeFun } from '../types';

export abstract class Select2<Entity> extends Selector<Entity> implements ISelect2<Entity> {
  public select1!: ISelect1<Entity>;

  public constructor(state: IGeneticState, optimize: OptimizeFun) {
    super(state, optimize);
    this.init();
  }

  public abstract init(): void;

  public select(pop: IPopulation): [Entity, Entity] {
    return [
      this.select1.select(pop),
      this.select1.select(pop)
    ];
  }
}
