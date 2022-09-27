import { Organization } from './Organization';
import { User } from './User';
import { EvaluationStatus } from 'library/common/enums';

export interface Evaluation {
  uid: string;
  nomenclature: string;
  dateStart: string;
  dateEnd:  string | null;
  datePending: string | null;
  organization: Organization;
  score: number;
  scorePercent: number;
  indicatorColor: string;
  manager: User;
  status: EvaluationStatus;
  statusVerbose: string;
  statusLabel: string;
}