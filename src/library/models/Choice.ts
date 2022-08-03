import { Level } from "./Level";
import { Criterion } from './Criterion';

export interface Choice {
  id: number;
  details: string;
  level: Level;
  criterion: Criterion;
}

export interface LightChoice {
  id: number;
  details: string;
  level: Level;
}