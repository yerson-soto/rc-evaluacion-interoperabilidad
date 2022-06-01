import { Evaluation } from "library/models/Evaluation";
import { Response } from "library/models/Response";

export interface GetEvaluation {
  id:          string;
  dateInitial: string;
  organismoId: number;
}

export interface EvaluationRepository {
  getEvaluations: () => Promise<Evaluation[]>;
  mapResult: (result: GetEvaluation) => Evaluation;
}