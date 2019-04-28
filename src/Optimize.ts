import { OptimizeFun } from './types';

export const Maximize: OptimizeFun = (first: number, second: number) => {
  return first >= second;
};

export const Minimize: OptimizeFun = (first: number, second: number) => {
  return first <= second;
};

export const Max = Maximize;
export const Min = Minimize;
