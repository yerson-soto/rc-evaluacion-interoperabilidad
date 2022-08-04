import { Organization } from './Organization';
import { User } from './User';

export interface Evaluation {
  uid: string;
  dateCreated: string;
  score: number;
  organization: Organization;
  user: User;
}