import { Serialization } from "./Serialization";
import * as Optimize from "./Optimize";

import {
  Select1,
  Select2,
  Population,
  SingleSelection,
  PairWiseSelection,
} from "./Selection";

export interface Stats {
  maximum: number;
  minimum: number;
  mean: number;
  stdev: number;
}
export interface Configuration {
  size: number;
  crossover: number;
  mutation: number;
  iterations: number;
  fittestAlwaysSurvives: boolean;
  maxResults: number;
  webWorkers: boolean;
  skip: number;
}
export interface InternalGenState {
  rlr: number;
  seq: number;
}

function clone(obj: any) {
  // tslint:disable-next-line:triple-equals
  if (obj == null || typeof obj != "object") {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
}

function addslashes(str: string) {
  // tslint:disable-next-line:no-octal-literal
  return str.replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
}

export { Optimize, Serialization, Select1, Select2 };

export abstract class Genetic<Entity, UserData> {
  protected usingWebWorker?: boolean;
  private entities: Entity[] = [];

  public internalGenState: InternalGenState = {
    rlr: 0,
    seq: 0,
  };
  protected readonly configuration: Configuration;
  constructor(
    configuration: Partial<Configuration>,
    public readonly userData: UserData
  ) {
    this.configuration = Object.assign(
      {},
      this.defaultConfiguration,
      configuration
    );
  }

  protected defaultConfiguration: Configuration = {
    crossover: 0.9,
    fittestAlwaysSurvives: true,
    iterations: 100,
    maxResults: 100,
    mutation: 0.2,
    size: 250,
    skip: 0,
    webWorkers: true,
  };
  public abstract optimize:  Optimize.OptimizeFun;
  protected abstract seed(): Entity;
  protected abstract mutate(entity: Entity): Entity;
  protected abstract crossover(
    mother: Entity,
    father: Entity
  ): [Entity, Entity];
  protected abstract fitness(entity: Entity): number;
  protected abstract generation(
    pop: Population<Entity>,
    generation: number,
    stats: Stats
  ): boolean;
  protected abstract notification(notification: {
    population: Population<Entity>;
    generation: number;
    stats: Stats;
    isFinished: boolean;
  }): void;
  protected abstract select1: SingleSelection<Entity>;
  protected abstract select2: PairWiseSelection<Entity>;

  // tslint:disable-next-line:max-func-body-length
  public start() {
    const mutateOrNot = (entity: Entity) => {
      // applies mutation based on mutation probability
      return Math.random() <= this.configuration.mutation && this.mutate
        ? this.mutate(clone(entity))
        : entity;
    };

    // seed the population
    for (let currSeed = 0; currSeed < this.configuration.size; ++currSeed) {
      this.entities.push(clone(this.seed()));
    }

    for (
      let currIteration = 0;
      currIteration < this.configuration.iterations;
      ++currIteration
    ) {
      // reset for each generation
      this.internalGenState = {
        rlr: 0,
        seq: 0,
      };

      // score and sort
      const pop = this.entities
        .map(entity => {
          return { fitness: this.fitness(entity), entity: entity };
        })
        .sort((entityA, entityB) => {
          return this.optimize(entityA.fitness, entityB.fitness) ? -1 : 1;
        });

      // generation notification
      const mean =
        pop.reduce((currMean, popItem) => {
          return currMean + popItem.fitness;
        }, 0) / pop.length;
      const stdev = Math.sqrt(
        pop
          .map(popItem => {
            return (popItem.fitness - mean) * (popItem.fitness - mean);
          })
          .reduce((currStdev, popItem) => {
            return currStdev + popItem;
          }, 0) / pop.length
      );

      const stats = {
        maximum: pop[0].fitness,
        mean: mean,
        minimum: pop[pop.length - 1].fitness,
        stdev: stdev,
      };

      const foundSolution = this.generation
        ? this.generation(pop, currIteration, stats)
        : true;
      const isFinished =
        !foundSolution || currIteration === this.configuration.iterations - 1;

      const shouldSendNotification: boolean =
        this.notification &&
        (isFinished ||
          this.configuration.skip === 0 ||
          currIteration % this.configuration.skip === 0);
      if (shouldSendNotification) {
        this.sendNotification({
          generation: currIteration,
          isFinished,
          population: pop.slice(0, this.configuration.maxResults),
          stats,
        });
      }

      if (isFinished) {
        break;
      }

      // crossover and mutate
      const newPop = [];

      if (this.configuration.fittestAlwaysSurvives) {
        // lets the best solution fall through
        newPop.push(pop[0].entity);
      }

      while (newPop.length < this.configuration.size) {
        if (
          this.crossover && // if there is a crossover function
          Math.random() <= this.configuration.crossover && // base crossover on specified probability
          newPop.length + 1 < this.configuration.size // keeps us from going 1 over the max population size
        ) {
          const parents = this.select2(pop);
          const children = this.crossover(
            clone(parents[0]),
            clone(parents[1])
          ).map(mutateOrNot);
          newPop.push(children[0], children[1]);
        } else {
          newPop.push(mutateOrNot(this.select1(pop)));
        }
      }

      this.entities = newPop;
    }
  }

  private sendNotification({
    population: pop,
    generation,
    stats,
    isFinished,
  }: {
    population: Population<Entity>;
    generation: number;
    stats: Stats;
    isFinished: boolean;
  }) {
    const response = {
      generation: generation,
      isFinished: isFinished,
      pop: pop.map(Serialization.stringify),
      stats: stats,
    };

    // self declared outside of scope
    this.notification({
      generation: response.generation,
      isFinished: response.isFinished,
      population: response.pop.map(Serialization.parse),
      stats: response.stats,
    });
  }

  // tslint:disable-next-line:max-func-body-length
  public evolve(): void {
    this.start();

    /*
    // bootstrap webworker script
    var blobScript = "'use strict'\n";
    blobScript +=
      "var Serialization = {'stringify': " +
      Serialization.stringify.toString() +
      ", 'parse': " +
      Serialization.parse.toString() +
      "};\n";
    blobScript += "var Clone = " + Clone.toString() + ";\n";

    // make available in webworker
    blobScript +=
      'var Optimize = Serialization.parse("' +
      addslashes(Serialization.stringify(Optimize)) +
      '");\n';
    blobScript +=
      'var Select1 = Serialization.parse("' +
      addslashes(Serialization.stringify(Select1)) +
      '");\n';
    blobScript +=
      'var Select2 = Serialization.parse("' +
      addslashes(Serialization.stringify(Select2)) +
      '");\n';

    // materialize our ga instance in the worker
    blobScript +=
      'var genetic = Serialization.parse("' +
      addslashes(Serialization.stringify(this)) +
      '");\n';
    blobScript += "onmessage = function(e) { genetic.start(); }\n";

    const self = this;

    if (this.usingWebWorker) {
      // webworker
      var blob = new Blob([blobScript]);
      var worker = new Worker(window.URL.createObjectURL(blob));
      worker.onmessage = function(e) {
        var response = e.data;
        self.notification(
          response.pop.map(Serialization.parse),
          response.generation,
          response.stats,
          response.isFinished
        );
      };
      worker.onerror = function(e) {
        alert(
          "ERROR: Line " + e.lineno + " in " + e.filename + ": " + e.message
        );
      };
      worker.postMessage("");
    } else {
      // simulate webworker
      (function() {
        const onmessage: any = undefined;
        eval(blobScript);
        onmessage(null);
      })();
    }
    */
  }
}
