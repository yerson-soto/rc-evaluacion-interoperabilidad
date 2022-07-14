import { Domain } from './Domain';

export interface Lineament {
  id: number;
  nomenclature: string;
  description: string;
  domain: Domain;
}