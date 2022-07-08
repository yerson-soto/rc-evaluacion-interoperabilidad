import { CommonRepository } from "./CommonRepository";
import { Evaluation } from "library/models/Evaluation";
import { GetEvaluation } from "library/api/dto/evaluation-dto";

export interface EvaluationRepository extends CommonRepository<Evaluation> {
  createNew: (organization: number) => Promise<Evaluation>;
  mapResult: (result: GetEvaluation) => Evaluation;
}
