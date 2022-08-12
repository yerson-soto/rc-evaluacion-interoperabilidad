import { Organization } from './Organization';
import { User } from './User';
import { EvaluationStatus } from 'library/common/enums';

export interface Evaluation {
  uid: string;
  dateCreated: string;
  score: number;
  organization: Organization;
  user: User;
  status: EvaluationStatus;
}