/**
 * Utility functions
 */

export const flip = (bias: number = 50): boolean => {
    return (Math.random() * 100) < bias;
  };

/**
 * Random integer from 0, up to, but not including, ceiling
 * [0, ceil)
 */
export const randomInt = (ceil: number) => {
  return Math.floor(ceil * Math.random());
}

export function randomSetFromSet<A>(set: A[], size: number): A[] {
  const setSize = set.length;
  const newSet: typeof set = [];

  for(let i = 0; i < size; i++) {
    newSet.push( set[randomInt(setSize)] );
  }

  return newSet;
}
