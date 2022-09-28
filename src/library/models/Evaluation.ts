import { Organization } from './Organization';
import { User } from './User';
import { EvaluationStatus } from 'library/common/enums';

export interface Evaluation {
  uid: string;
  nomenclature: string;
  organization: Organization;
  manager: User;
  score: number;
  scorePercent: number;
  scoreColor: string;
  status: EvaluationStatus;
  statusVerbose: string;
  statusLabel: string;
  dateStart: string;
  dateStartReadable: string;
  dateEnd: string | null;
  dateEndReadable: string;
  datePending: string | null;
  datePendingReadable: string;
}