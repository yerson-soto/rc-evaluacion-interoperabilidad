import { Choice } from "./Choice";
import { Lineament } from "./Lineament";

export interface Criterion {
  id: number;
  name: string;
  categories: Lineament[];
  choices: Choice[];
}