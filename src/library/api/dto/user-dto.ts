export interface CreateUser {
  document: string;
  firtName: string;
  lastName: string;
  email: string;
  urlBase: string;
  userType: number;
}

export interface GetUser {
  id: string;
  document: string;
  firstName: string;
  lastName: string;
  email: string;
  urlBase: string;
  userType: number;
}