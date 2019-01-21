import { expect } from 'chai'
import TestGA from '../fixtures';
import { IConfiguration } from '../../src/interfaces/Configuration';

/** pass-through: no mutation or crossover */
const config1: Partial<IConfiguration> = {
  crossover: 0,
  mutation: 0,
  iterations: 10,
};

const getGA = (conf?: Partial<IConfiguration>) => {
  return new TestGA(conf);
}

describe.only('Example 1: pass-through', () => {
  it('runs without error ', (done) => {
    getGA(config1).evolve().then((ga) => {
      expect(ga).not.be.undefined;
      expect(ga).not.eq(null);

      return done();
    }, done);
  });

  it('stores 10 generations', (done) => {
    getGA(config1).evolve().then((ga) => {
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
});
