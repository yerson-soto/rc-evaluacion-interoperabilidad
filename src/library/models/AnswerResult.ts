import { Choice } from "./Choice";

export interface AnswerResult {
  uid: string;
  overallScore: number;
  choice: Choice;
}