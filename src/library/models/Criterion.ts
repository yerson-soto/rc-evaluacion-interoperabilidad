import { Choice } from './Choice';
import { LightLineament } from './Lineament';

export interface Criterion {
  id: number;
  name: string;
  lineaments: LightLineament[];
}

export interface FullCriterion {
  id: number;
  name: string;
  choices: Choice[];
  lineaments: LightLineament[];
}