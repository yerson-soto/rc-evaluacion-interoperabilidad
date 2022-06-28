import { Organization } from './Organization';
import { Domain } from './Domain';

export interface Evaluation {
  uid: string;
  organization: Organization;
  dateCreated: string;
  score: number | null;
}