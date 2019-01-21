import { Genome } from './interfaces/Genetic';
import { MutationFun } from './types';

export const Noop: MutationFun = (a: Genome) => a;
