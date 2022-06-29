import { CommonRepository } from "./CommonRepository";
import { Evaluation } from "library/models/Evaluation";

export interface GetEvaluation {
  id: string;
  dateInitial: string;
  organismo: {
    id: number;
    orgasnimo: string;
    siglas: string;
  };
  currentLevel: number;
}

export interface GetPaginatedEvaluation {
  elementostotales: number;
  page: number;
  rows: number;
  paginastotales: number;
  evaluations: GetEvaluation[];
}

export interface EvaluationRepository extends CommonRepository<Evaluation> {
  createNew: (organization: number) => Promise<Evaluation>;
  mapResult: (result: GetEvaluation) => Evaluation;
}
