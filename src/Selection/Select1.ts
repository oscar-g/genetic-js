import { IPopulation } from './../interfaces/Population';
import { ISelect1 } from './../interfaces/Selector';
import { Selector } from './Selector';

export default abstract class Select1<Entity> extends Selector<Entity> implements ISelect1<Entity> {
  public abstract select(pop: IPopulation): Entity;
}
