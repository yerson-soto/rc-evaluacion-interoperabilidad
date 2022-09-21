import { Organization } from './Organization';

export interface Ranking {
  institution: Organization;
  score: number;
  timesEvaluated: number;
}