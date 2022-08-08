import { GetLevel } from './level-dto';
import { GetCriterion } from './criterion-dto';

interface CreateRequiredEvidence {
  title: string;
  contentType: string;
}

export interface CreateChoice {
  levelId: number;
  criterionId: number;
  responseDecription: string;
  isEvidenceRequired: boolean;
  requiredEvidencesRequests: CreateRequiredEvidence[]
}

export interface GetChoice {
  responsesId: number;
  responseDecription: string;
  isEvidenceRequired: boolean;
  requiredEvidencesResponses: CreateRequiredEvidence[];
  levelsResponse: GetLevel;
  criterionResponse: GetCriterion;
}