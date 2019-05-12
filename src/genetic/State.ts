import IState from "./IState";

export class State<Entity> implements IState {
  public entities!: Entity[];
  public generation!: number;
  public selection = {
    seq: 0,
    rlr: 0,
  };

  constructor(pop: Entity[]) {
    this.generation = 0;
    this.setEntities(pop);
  }

  public incGen(): number {
    return this.generation++;
  }

  public incSelection(name: keyof IState["selection"]): number {
    return this.generation++;
  }

  public setSelection(name: keyof IState["selection"], value: number) {
    this.selection[name] = value;

    return value;
  }

  public resetSelection() {
    this.setSelection("seq", 0);
    this.setSelection("rlr", 0);
  }

  public setEntities(pop: Entity[]) {
    this.entities = pop;
  }
}

export default State;
