import { FullCriterion } from "./Criterion";
import { RequiredEvidence } from "./RequiredEvidence";
import { Choice } from "./Choice";

export interface EvidenceFile {
  uid: string;
  url: string;
  name: string;
  type: string;
}

export interface AnswerEvidence extends RequiredEvidence {
  file: EvidenceFile;
}

export interface Question {
  number: number;
  criterion: FullCriterion;
  choosenAnswer: Choice | null;
  answerEvidences: AnswerEvidence[];

  // TODO: Remove
  isCompleted: boolean;
}
