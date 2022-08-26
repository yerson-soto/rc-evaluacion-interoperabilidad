import { FullCriterion } from "./Criterion";
import { RequiredEvidence } from "./RequiredEvidence";
import { Choice } from "./Choice";

export interface Question {
  number: number;
  criterion: FullCriterion;
  selectedAnswer: Choice | null;
  providedEvidences: RequiredEvidence[];

  // TODO: Remove
  isCompleted: boolean;
}