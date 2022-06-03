import { Evaluation } from "library/models/Evaluation";

export interface GetEvaluation {
  id: string;
  dateInitial: string;
  organismo: {
    id: number;
    orgasnimo: string;
    siglas: string;
  };
  domain: {
    id: number;
    description: string;
  }
}

export interface GetPaginatedEvaluation {
  elementostotales: number;
  page: number;
  rows: number;
  paginastotales: number;
  evaluationInstitutionalsResponse: GetEvaluation[];
}

export interface EvaluationRepository {
  mapResult: (result: GetEvaluation) => Evaluation;
}
