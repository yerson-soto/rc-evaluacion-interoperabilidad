import { Organization } from './Organization';
import { Domain } from './Domain';

export interface Evaluation {
  uid: string;
  domains: Domain[];
  organization: Organization;
  dateCreated: string;
}