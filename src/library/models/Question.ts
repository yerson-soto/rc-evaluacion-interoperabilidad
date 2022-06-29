import { Criterion } from "./Criterion";
import { Choice } from "./Choice";

export interface Question {
  criterion: Criterion;
  response: Choice | null;
  evidences: null;
}