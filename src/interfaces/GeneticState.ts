export default interface GeneticState<Entity> {
  population: Population<Entity>;
  generation: number;
  stats: Stats;
}
