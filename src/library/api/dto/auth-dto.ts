import { GetOrganizationNested } from "./organization-dto";

export interface GetToken {
  tokenUser: string;
}

export interface GetAuthUser {
  id:        string;
  document:  string;
  firtName:  string;
  lastName:  string;
  fullName:  string;
  email:     string;
  organismo: GetOrganizationNested;
  tokenUser: null;
}

