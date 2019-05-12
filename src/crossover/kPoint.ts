import Genome from "../population/Genome";
import { randomInt } from "../util";
import CrossoverOperator from "./CrossoverOperator";
import Simple, { singlePointCrossover } from "./Simple";

export const kPoint: (k: number) => CrossoverOperator = (k: number) => {
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
};

export default kPoint;
