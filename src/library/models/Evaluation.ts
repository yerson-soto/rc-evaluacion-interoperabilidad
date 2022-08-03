import { Organization } from './Organization';

export interface Evaluation {
  uid: string;
  organization: Organization;
  dateCreated: string;
  score: number;
}