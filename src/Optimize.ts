export type OptimizeFun = (fitnessA: number, fitnessB: number) => boolean;

export class Optimize {
  static Maximize(a: number, b: number) {
    return a >= b;
  }
  static Minimize(a: number, b: number) {
    return a < b;
  }
}
