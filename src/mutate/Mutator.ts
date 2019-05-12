import Genome from "../population/Genome";

export type Mutator = (a: Genome) => Genome;

export const Noop: Mutator = (a: Genome) => a;

export default Mutator;
