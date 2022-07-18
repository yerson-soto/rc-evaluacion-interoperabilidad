import { GetLevel } from './level-dto';
import { GetCriterion } from './criterion-dto';

export interface CreateChoice {
  levelId: number;
  criterionId: number;
  description: string;
}

export interface GetChoice {
  responsesId: number;
  responseDecription: string;
  levelsResponse: GetLevel;
  criterion: GetCriterion;
}