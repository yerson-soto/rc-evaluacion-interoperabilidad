import { GetLevel } from './level-dto';
import { GetCriterion } from './criterion-dto';

interface CreateRequiredEvidence {
  id?: string;
  title: string;
  contentType: string;
}

export interface GetRequiredEvidence {
  id: string;
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
  requiredEvidencesResponses: GetRequiredEvidence[];
  levelsResponse: GetLevel;
  criterionResponse: GetCriterion;
}

export interface UpdateAnswer {
  evaluationInstitutionalId: string;
  criterionId: number;
  responsesId: number;
}

export interface GetAnswerEvidence {
  id: string;
  url: string;
  dateGeneric: string;
  nameFile: string;
  typeDocument: string;
  evaluationTechnicsId: string;
  requiredEvidence: GetRequiredEvidence;
}

export interface UpdateEvidencesParams {
  evaluationTechnicsId: string;
  responseId: number;
}