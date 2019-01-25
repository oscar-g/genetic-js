import * as sinon from 'sinon';
import { expect } from 'chai';

import { Genome } from '../../src/interfaces/Genetic';
import * as Crossover from '../../src/Crossover';
import { randomSetFromSet } from '../../src/util';
import * as Utils from './../../src/util';

describe('Crossover functions', () => {
  describe('Simple', () => {
    it('returns genomes of the same length as the parents', () => {
      const g1: Genome = randomSetFromSet([0, 1], 10);
      const g2: Genome = randomSetFromSet([0, 1], 10);

      const [a, b] = Crossover.Simple(g1, g2, g1.length);

      expect(a.length).eq(10);
      expect(b.length).eq(10);
    });

    it('works correctly', () => {
      const g1: Genome = randomSetFromSet([1], 5);
      const g2: Genome = randomSetFromSet([0], 5);

      const s = sinon.stub(Utils, 'randomInt').returns(3);
      
      const [a, b] = Crossover.Simple(g1, g2, g1.length);

      expect(a).deep.eq([1, 1, 1, 0, 0]);
      expect(b).deep.eq([0, 0, 0, 1, 1]);

      s.restore();
    });
  });
  describe('kPoint (k = 2)', () => {
    it('returns genomes of the same length as the parents', () => {
      const g1: Genome = randomSetFromSet(['a', 'a'], 10);
      const g2: Genome = randomSetFromSet(['x', 'x'], 10);

      const [a, b] = Crossover.kPoint(2)(g1, g2, g1.length);
      console.log(0, [g1, g2])
      console.log(1, [a, b]);
      expect(a.length).eq(10);
      expect(b.length).eq(10);
    });

    it('works correctly');
  });
})