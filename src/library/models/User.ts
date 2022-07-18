import { UserType } from "library/common/enums";

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  type: UserType;
  organizationId: number;
}