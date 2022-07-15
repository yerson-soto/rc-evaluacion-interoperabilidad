import { Domain } from './Domain';

export interface LightLineament {
  id: number;
  nomenclature: string;
  description: string;
}

export interface Lineament {
  id: number;
  nomenclature: string;
  description: string;
  domain: Domain;
}