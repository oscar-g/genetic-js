export default interface Configuration {
  size: number;
  crossover: number;
  mutation: number;
  iterations: number;
  fittestAlwaysSurvives: boolean;
  maxResults: number;
  webWorkers: boolean;
  skip: number;
}
