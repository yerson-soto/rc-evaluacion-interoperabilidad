import { Evaluation } from './Evaluation';

export interface Schedule {
  date: string;
  total: number;
  events: Evaluation[];
}