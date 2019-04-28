import { expect } from 'chai'
import TestGA from '../fixtures';
import { IConfiguration } from '../../src/interfaces/Configuration';

const getGA = (conf?: Partial<IConfiguration>) => {
  return new TestGA(Object.assign({}, TestGA.example1Config, conf || {}));
}

/**
 * Example 1) Converge to known value
 * 
 * Maximize random binary genome
 * 
 */
describe('e2e Example 1', () => {
  it('runs without error ', (done) => {
    getGA().evolve().then((ga) => {
      expect(ga).not.be.undefined;
      expect(ga).not.eq(null);

      return done();
    }, done);
  });

  it('stores 10 generations', (done) => {
    getGA().evolve().then((ga) => {
      const pop  = ga.populations

      expect(pop).not.be.undefined;
      expect(pop).not.eq(null);

      const popKeys = Object.keys(pop);

      expect(popKeys.length).eq(10, 'There should be 10 generations');
      expect(popKeys).include('1', 'First generation should exist');
      expect(popKeys).include('10', 'Last generation should exist');

      return done();
    }).catch((e) => {
      done(e);
    });
  });

  it('converges to the known value', (done) => {
    getGA().evolve().then((ga) => {
      const known = 5;
      const statsInit = ga.populations[1].stats;
      const statsFinal = ga.populations[10].stats;

      // console.log(statsInit, statsFinal)
      
      expect(statsInit.min).lt(known);
      expect(statsInit.max).lte(known);
      expect(statsInit.mean).lt(known);
      expect(statsInit.stdev).gt(0);

      expect(statsFinal.min).eq(known);
      expect(statsFinal.max).eq(known);
      expect(statsFinal.mean).eq(known);
      expect(statsFinal.stdev).eq(0);

      done();
    }).catch(_ => done(_));
  });
});
