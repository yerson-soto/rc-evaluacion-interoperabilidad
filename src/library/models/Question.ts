import { FullCriterion } from "./Criterion";
import { UploadFile } from "antd/lib/upload";
import { RequiredEvidence } from "./RequiredEvidence";
import { Choice } from "./Choice";

interface QuestionEvidence extends RequiredEvidence {
  evidenceUrl: string;
}

interface QuestionFile {
  evidenceId: string;
  file: UploadFile;
}

export interface Question {
  number: number;
  criterion: FullCriterion;
  choosenAnswer: Choice | null;
  savedEvidences: QuestionEvidence[];
  uploadedFiles: QuestionFile[];

  // TODO: Remove
  isCompleted: boolean;
}
