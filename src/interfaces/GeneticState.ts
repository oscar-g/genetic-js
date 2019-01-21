/* tslint:disable:no-any */
import { ISelectionState } from './SelectionState';

/**
 * Keep root state for a genetic algo. at a specified generation
 *
 * @todo type parameter Entity ???
 */
export interface IGeneticState {
  entities: any[];
  generation: number;
  selection: ISelectionState;

  incGen(): number;
  setEntities(entities: any[]): void;
  incSelection(name: keyof ISelectionState): number;
  setSelection(name: keyof ISelectionState, value: number): number;
  resetSelection(): void;
}
