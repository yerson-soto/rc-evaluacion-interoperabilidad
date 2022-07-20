export interface GetOrganization {
  id: number;
  name: string;
  acroyn: string;
  email: string;
}

export interface GetOrganizationNested {
  id: number;
  orgasnimo: string;
  siglas: string;
}
