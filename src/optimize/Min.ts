import Max from "./Max";
import Optimizer from "./Optimizer";

export const Min: Optimizer = (a: number, b: number) => Max(b, a);

export default Min;
