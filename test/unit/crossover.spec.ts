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

      const [a, b] = Crossover.Simple(g1, g2, 2);

      expect(a.length).eq(10);
      expect(b.length).eq(10);
    });

    it('works correctly', () => {
      const g1: Genome = randomSetFromSet([1], 5);
      const g2: Genome = randomSetFromSet([0], 5);

      sinon.stub(Utils, 'randomInt').returns(3);
      
      const [a, b] = Crossover.Simple(g1, g2, 2);

      expect(a).deep.eq([1, 1, 1, 0, 0]);
      expect(b).deep.eq([0, 0, 0, 1, 1]);
    });
  })
})