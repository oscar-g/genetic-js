import { IStats } from './Stats';
import { IPopulation } from './Population';

export default interface Notification<Entity> {
  population: IPopulation;
  generation: number;
  stats: IStats;
  isFinished: boolean;
}
