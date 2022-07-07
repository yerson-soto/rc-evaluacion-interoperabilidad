import { CommonRepository } from "./CommonRepository";
import { Organization } from "library/models/Organization";

export interface GetOrganization {
  id: number;
  name: string;
  acroyn: string;
}

export interface OrganizationRepository extends CommonRepository<Organization> {
  mapResult: (result: GetOrganization) => Organization;
}
