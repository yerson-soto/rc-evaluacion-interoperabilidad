import { Organization } from './Organization';
import { User } from './User';
import { EvaluationStatus } from 'library/common/enums';

export interface Evaluation {
  uid: string;
  nomenclature: string;
  dateCreated: string;
  organization: Organization;
  user: User;
  status: EvaluationStatus;
  score: number;
  scorePercent: number;
  indicatorColor: string;
}