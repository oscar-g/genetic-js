/** @todo split into files, add better documentation and examples */

/**
 * A flexible genome definition.
 * 
 * Supports base pairs in single-chromosome genome with
 * an array of individual strings or numbers.
 * 
 * Possible to model multiple chromosomes with an array of delimited strings + custom toGenome function
 *
 * @todo better support for Genomes with multiple chromosomes
 */
export type Genome = (string|number)[];

/**
 * A Crossover function mates two genomes and returns two children.
 */
export type CrossoverFun = (a: Genome, b: Genome, chrSize: number) => [Genome, Genome];


export type MutationFun = (a: Genome) => Genome;
