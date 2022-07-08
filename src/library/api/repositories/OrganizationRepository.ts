import { CommonRepository } from "./CommonRepository";
import { Organization } from "library/models/Organization";
import { GetOrganization } from "library/api/dto/organization-dto";

export interface OrganizationRepository extends CommonRepository<Organization> {
  mapResult: (result: GetOrganization) => Organization;
}
