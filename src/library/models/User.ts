import { UserType } from "library/common/enums";
import { Organization } from './Organization';

export interface User {
  uid: string;
  identification: string;
  firstName: string;
  lastName: string;
  email: string;
  type: UserType;

  // TODO: Remove this field
  organizationId: number;
}

export interface AuthUser extends User {
  organization: Organization | null;
}