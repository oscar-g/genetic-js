import { Genome } from '../interfaces/Genetic';

export type CrossoverFun = (a: Genome, b: Genome, chrSize: number) => [Genome, Genome];

/** @todo rework to support array of fitnesses and output winning index */
export type OptimizeFun = (fitnessA: number, fitnessB: number) => boolean;

export type MutationFun = (a: Genome) => Genome;

