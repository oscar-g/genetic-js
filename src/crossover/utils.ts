import Genome from "../population/Genome";

// tslint:disable-next-line: export-name
export function cut(a: Genome, pt: number): [Genome, Genome] {
  return [a.slice(0, pt), a.slice(pt)];
}
