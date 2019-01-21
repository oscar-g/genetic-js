import { Genome } from './interfaces/Genetic';
import { randomInt } from './util';
import { CrossoverFun } from './types';

function cut(a: Genome, pt: number): [Genome, Genome] {
  return [a.splice(0, pt), a.splice(pt)];
}

export const Simple: CrossoverFun = (e1, e2, s: number) => {
  const pt = randomInt(s);
  const [e1g1, e1g2] = cut(e1, pt);
  const [e2g1, e2g2] = cut(e2, pt);

  return [
    (e1g1 as any[]).concat(e2g2 as any[]),
    (e2g1 as any[]).concat(e1g2 as any[]),
  ];
};
