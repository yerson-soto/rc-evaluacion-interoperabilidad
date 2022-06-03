import { Organization } from './Organization';
import { Domain } from './Domain';

export interface Evaluation {
  uuid: string;
  domains: Domain[];
  organization: Organization;
  dateCreated: string;
}