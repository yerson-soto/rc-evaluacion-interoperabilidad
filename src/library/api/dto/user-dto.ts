import { GetOrganizationNested } from './organization-dto';

export interface CreateUser {
  document: string;
  email: string;
  urlBase: string;
  userType: number;
  organismoId: number;
}

export interface GetUser {
  id: string;
  document: string;
  firtName: string;
  lastName: string;
  fullName: string;
  email: string;
  userType: number;
  organismo: GetOrganizationNested;
}

export interface GetUserIdentity {
  document: string;
  firtName: string;
  lastName: string;
  fullName: string;
}