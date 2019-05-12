/* tslint:disable:no-any */

/**
 * State for selection functions that
 * require sequential or linear rank integers
 */
export interface ISelectionState {
  seq: number;
  rlr: number;
}

/**
 * state for a genetic algo at specified generation
 *
 * @todo type parameter Entity ???
 */
export interface IState {
  entities: any[];
  generation: number;
  selection: ISelectionState;

  incGen(): number;
  setEntities(entities: any[]): void;
  incSelection(name: keyof ISelectionState): number;
  setSelection(name: keyof ISelectionState, value: number): number;
  resetSelection(): void;
}

export default IState;
