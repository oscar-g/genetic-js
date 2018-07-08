import * as assert from "assert";

import * as Genetic from "../src";
import {
  Population,
  SingleSelection,
  PairWiseSelection,
} from "../src/Selection";
import { Stats, Configuration } from "../src";

type Entity = string;
type UserData = any;

abstract class PhraseGenetic extends Genetic.Genetic<Entity, UserData> {
  public optimize = Genetic.Optimize.Maximize;
  public seed() {
    function randomString(len: number) {
      let text = "";
      const charset = "abcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < len; i++) {
        text += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return text;
    }

    // create random strings that are equal in length to solution
    return randomString(this.userData.solution.length);
  }
  public mutate(entity: Entity) {
    function replaceAt(str: string, index: number, character: string) {
      return (
        str.substr(0, index) + character + str.substr(index + character.length)
      );
    }

    // chromosomal drift
    const i = Math.floor(Math.random() * entity.length);
    return replaceAt(
      entity,
      i,
      String.fromCharCode(
        entity.charCodeAt(i) + (Math.floor(Math.random() * 2) ? 1 : -1)
      )
    );
  }
  public crossover(mother: Entity, father: Entity): [Entity, Entity] {
    // two-point crossover
    const len = mother.length;
    let ca = Math.floor(Math.random() * len);
    let cb = Math.floor(Math.random() * len);
    if (ca > cb) {
      const tmp = cb;
      cb = ca;
      ca = tmp;
    }

    const son =
      father.substr(0, ca) + mother.substr(ca, cb - ca) + father.substr(cb);
    const daughter =
      mother.substr(0, ca) + father.substr(ca, cb - ca) + mother.substr(cb);

    return [son, daughter];
  }
  public fitness(entity: Entity) {
    let fitness = 0;

    let i;
    for (i = 0; i < entity.length; ++i) {
      // increase fitness for each character that matches
      if (entity[i] == this.userData.solution[i]) { fitness += 1; }

      // award fractions of a point as we get warmer
      fitness +=
        (127 -
          Math.abs(
            entity.charCodeAt(i) - this.userData.solution.charCodeAt(i)
          )) /
        50;
    }

    return fitness;
  }

  public generation(
    pop: Population<Entity>,
    generation: number,
    stats: Stats
  ): boolean {
    // stop running once we've reached the solution
    return pop[0].entity != this.userData.solution;
  }
}

function solveTest(
  singleSelectionName: keyof typeof Genetic.Select1,
  pairWiseSelectionName: keyof typeof Genetic.Select2,
  config: Partial<Configuration>
) {
  const singleSelection: SingleSelection<Entity> =
    Genetic.Select1[singleSelectionName];
  const pairWiseSelection: PairWiseSelection<Entity> =
    Genetic.Select2[pairWiseSelectionName];

  it(singleSelectionName + ", " + pairWiseSelectionName, function(done) {
    expect.assertions(1);
    const userData: UserData = {
      solution: "thisisthesolution",
    };
    class CustomPhraseGenetic extends PhraseGenetic {
      public select1 = singleSelection;
      public select2 = pairWiseSelection;
      public notification(
        pop: Population<Entity>,
        generation: number,
        stats: Stats,
        isFinished: boolean
      ) {
        if (isFinished) {
          expect(pop[0].entity).toBe(this.userData.solution);
          done();
        }
      }
    }
    const genetic = new CustomPhraseGenetic(config, userData);
    genetic.evolve();
  });
}

describe("Genetic String Solver", function() {
  const config: Partial<Configuration> = {
    iterations: 2000,
    size: 20,
    crossover: 0.4,
    mutation: 0.3,
  };

  for (const singleSelectionName in Genetic.Select1) {
    for (const pairWiseSelectionName in Genetic.Select2) {
      solveTest(
        singleSelectionName as any,
        pairWiseSelectionName as any,
        config
      );
    }
  }
});
