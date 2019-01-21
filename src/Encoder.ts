/**
 * Turns a value of type A into type B
 */
export type Encoder<A, B = A> = (a: A) => B;

/** Returns the given value */
/* tslint:disable:no-any */
export const identity: Encoder<any> = (a: any): typeof a => a;
