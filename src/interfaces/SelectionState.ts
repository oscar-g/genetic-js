/**
 * Keep state for selection functions that
 * require sequential or linear rank integers
 */
export interface ISelectionState {
  seq: number;
  rlr: number;
}
