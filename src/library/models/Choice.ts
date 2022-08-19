import { Level } from "./Level";
import { Criterion } from './Criterion';
import { RequiredEvidence } from './RequiredEvidence';

export interface Choice {
  id: number;
  details: string;
  isEvidenceRequired: boolean
  requiredEvidences: RequiredEvidence[];
  level: Level;
  criterion: Criterion;
}