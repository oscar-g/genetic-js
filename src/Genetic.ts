import { Serialization } from "./Serialization";
import { Optimize, OptimizeFun } from "./Optimize";
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

function Clone(obj: any) {
  if (obj == null || typeof obj != "object") return obj;
  return JSON.parse(JSON.stringify(obj));
}

function addslashes(str: string) {
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
    size: 250,
    crossover: 0.9,
    mutation: 0.2,
    iterations: 100,
    fittestAlwaysSurvives: true,
    maxResults: 100,
    webWorkers: true,
    skip: 0,
  };
  public abstract optimize: OptimizeFun;
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
  protected abstract notification(
    pop: Population<Entity>,
    generation: number,
    stats: Stats,
    isFinished: boolean
  ): void;
  protected abstract select1: SingleSelection<Entity>;
  protected abstract select2: PairWiseSelection<Entity>;

  public start() {
    const self = this;

    const mutateOrNot = (entity: Entity) => {
      // applies mutation based on mutation probability
      return Math.random() <= this.configuration.mutation && this.mutate
        ? this.mutate(Clone(entity))
        : entity;
    };

    // seed the population
    for (let i = 0; i < this.configuration.size; ++i) {
      this.entities.push(Clone(this.seed()));
    }

    for (let i = 0; i < this.configuration.iterations; ++i) {
      // reset for each generation
      this.internalGenState = {
        rlr: 0,
        seq: 0,
      };

      // score and sort
      var pop = this.entities
        .map(function(entity) {
          return { fitness: self.fitness(entity), entity: entity };
        })
        .sort(function(a, b) {
          return self.optimize(a.fitness, b.fitness) ? -1 : 1;
        });

      // generation notification
      var mean =
        pop.reduce(function(a, b) {
          return a + b.fitness;
        }, 0) / pop.length;
      var stdev = Math.sqrt(
        pop
          .map(function(a) {
            return (a.fitness - mean) * (a.fitness - mean);
          })
          .reduce(function(a, b) {
            return a + b;
          }, 0) / pop.length
      );

      var stats = {
        maximum: pop[0].fitness,
        minimum: pop[pop.length - 1].fitness,
        mean: mean,
        stdev: stdev,
      };

      var r = this.generation ? this.generation(pop, i, stats) : true;
      var isFinished =
        (typeof r != "undefined" && !r) ||
        i == this.configuration.iterations - 1;

      const shouldSendNotification: boolean =
        this.notification &&
        (isFinished ||
          this.configuration["skip"] == 0 ||
          i % this.configuration["skip"] == 0);
      if (shouldSendNotification) {
        this.sendNotification(
          pop.slice(0, this.configuration.maxResults),
          i,
          stats,
          isFinished
        );
      }

      if (isFinished) break;

      // crossover and mutate
      var newPop = [];

      if (this.configuration.fittestAlwaysSurvives)
        // lets the best solution fall through
        newPop.push(pop[0].entity);

      while (newPop.length < self.configuration.size) {
        if (
          this.crossover && // if there is a crossover function
          Math.random() <= this.configuration.crossover && // base crossover on specified probability
          newPop.length + 1 < self.configuration.size // keeps us from going 1 over the max population size
        ) {
          var parents = this.select2(pop);
          var children = this.crossover(
            Clone(parents[0]),
            Clone(parents[1])
          ).map(mutateOrNot);
          newPop.push(children[0], children[1]);
        } else {
          newPop.push(mutateOrNot(self.select1(pop)));
        }
      }

      this.entities = newPop;
    }
  }

  private sendNotification(
    pop: Population<Entity>,
    generation: number,
    stats: Stats,
    isFinished: boolean
  ) {
    const response = {
      pop: pop.map(Serialization.stringify),
      generation: generation,
      stats: stats,
      isFinished: isFinished,
    };

    // self declared outside of scope
    this.notification(
      response.pop.map(Serialization.parse),
      response.generation,
      response.stats,
      response.isFinished
    );
  }

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
