import Optimizer from "./Optimizer";

export const Max: Optimizer = (first: number, second: number) => {
  return first >= second;
};

export default Max;
