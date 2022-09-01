import { FullCriterion } from "./Criterion";
import { RequiredEvidence } from "./RequiredEvidence";
import { Choice } from "./Choice";

export interface Question {
  number: number;
  criterion: FullCriterion;
  choosenAnswer: Choice | null;
  answerEvidences: AnswerEvidence[];
}

export interface EvidenceFile {
  uid: string;
  url: string;
  name: string;
  type: string;
}

export interface AnswerEvidence extends RequiredEvidence {
  file: EvidenceFile;
}