/**
 * static config values
 */
export interface IConfiguration {
  /**
   * [1-Infinity]
   */
  popSize: number;
  chromosomeSize: number;
  iterations: number;

  /**
   * [0-100]
   */
  crossover: number;
  mutation: number;

  fittestAlwaysSurvives: boolean;
  enableNotification: boolean;
}
