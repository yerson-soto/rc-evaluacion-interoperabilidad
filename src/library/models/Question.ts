import { FullCriterion, Criterion } from './Criterion';
import { RequiredEvidence } from "./RequiredEvidence";
import { Choice } from "./Choice";

export interface CompletedQuestion {
  criterion: Criterion;
  choosenAnswer: Choice;
  answerEvidences: AnswerEvidence[];
}

export interface Question {
  number: number;
  criterion: FullCriterion;
  choosenAnswer: Choice | null;
  answerEvidences: AnswerEvidence[];
  isCompleted: boolean;
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