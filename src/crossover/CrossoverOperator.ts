import Genome from "../population/Genome";

/**
 * A Crossover function mates two genomes and returns two children.
 */
export type CrossoverOperator = (a: Genome, b: Genome, chrSize: number) => [Genome, Genome];

export default CrossoverOperator;
