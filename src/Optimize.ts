export type OptimizeFun = (fitnessA: number, fitnessB: number) => boolean;

export class Optimize {
  public static Maximize(a: number, b: number) {
    return a >= b;
  }
  public static Minimize(a: number, b: number) {
    return a < b;
  }
}
