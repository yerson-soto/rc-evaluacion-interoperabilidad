import { Choice } from './Choice';
import { Domain } from './Domain';
import { LightLineament } from './Lineament';

export interface Criterion {
  id: number;
  name: string;
  lineaments: LightLineament[];
}

export interface FullCriterion {
  id: number;
  domain: Domain;
  name: string;
  choices: Choice[];
  lineaments: LightLineament[];
}