import { Genome } from './interfaces/Genetic';
import { randomInt } from './util';
import { CrossoverFun } from './types';

export function cut(a: Genome, pt: number): [Genome, Genome] {
  return [a.slice(0, pt), a.slice(pt)];
}

function singlePointCrossover(pt: number, e1: Genome, e2: Genome): [Genome, Genome] {
  const [e1g1, e1g2] = cut(e1, pt);
  const [e2g1, e2g2] = cut(e2, pt);

  return [
    (e1g1).concat(e2g2),
    (e2g1).concat(e1g2),
  ];
}

export const Simple: CrossoverFun = (e1, e2, s: number) => {
  return singlePointCrossover(randomInt(s), e1, e2);
};

export const kPoint: (k: number) => CrossoverFun = (k: number) => {
  if (k === 1) { return Simple; }

  if (Math.round(k) > 1) {
    return (a, b, s) => {
      let childs: [Genome, Genome] = [a, b];

      /**
       * Perform k single-point crossovers at random points
       */
      for (let ki = 0; ki < Math.round(k); ki++) {
        const pt = randomInt(s);

        childs = singlePointCrossover(pt, childs[0], childs[1]);
      }

      return childs;
    };
  }

  console.error('kPoint crossover parameter "k" must be an integer greater than or equal to 1', { k });

  return Simple;
}
