import Genome from "../population/Genome";
import { randomInt } from "../util";
import CrossoverOperator from "./CrossoverOperator";
import { cut } from "./utils";

export function singlePointCrossover(pt: number, e1: Genome, e2: Genome): [Genome, Genome] {
  const [e1g1, e1g2] = cut(e1, pt);
  const [e2g1, e2g2] = cut(e2, pt);

  return [
    (e1g1).concat(e2g2),
    (e2g1).concat(e1g2),
  ];
}

export const Simple: CrossoverOperator = (e1, e2, s: number) => {
  return singlePointCrossover(randomInt(s), e1, e2);
};

export default Simple;
