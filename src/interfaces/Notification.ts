export default interface Notification<Entity> {
  population: Population<Entity>;
  generation: number;
  stats: Stats;
  isFinished: boolean;
}
