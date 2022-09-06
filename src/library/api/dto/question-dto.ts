import { GetChoice, GetRequiredEvidence } from './choice-dto';
import { GetCriterion } from './criterion-dto';

export interface GetQuestion {
  criterionResponse: GetCriterion;
  responses: GetChoice;
  fileEvaluationResponses: GetAnswerEvidence[];
}

export interface GetAnswerResult {
  evaluationTechnicsId: string;
  resultFinally: number;
  response: GetChoice;
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
  requiredEvidencesResponse: GetRequiredEvidence;
}

export interface UpdateEvidencesParams {
  evaluationTechnicsId: string;
  responseId: number;
}