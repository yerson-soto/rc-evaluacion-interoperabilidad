import { UserType } from "library/common/enums";
import { Organization } from './Organization';

export interface User {
  uid: string;
  identification: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  type: UserType;
  organization: Organization;
}

export interface AuthUser extends User {}

export interface UserIdentity {
  card: string;
  firstName: string;
  lastName: string;
  fullName: string;
}