import Optimizer from './Optimizer';
import Max from './Max';

const Min: Optimizer = (a: number, b: number) => Max(b, a);

export default Min;
