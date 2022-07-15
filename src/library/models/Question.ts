import { FullCriterion } from "./Criterion";
import { Choice } from "./Choice";

export interface Question {
  criterion: FullCriterion;
  response: Choice | null;
  evidences: null;
}