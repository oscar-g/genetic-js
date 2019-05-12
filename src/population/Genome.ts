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

export default Genome;
