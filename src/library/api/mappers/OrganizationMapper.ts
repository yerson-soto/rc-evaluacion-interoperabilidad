import { Organization } from "library/models/Organization";
import { GetOrganizationNested, GetOrganization } from "../dto/organization-dto";

export class OrganizationMapper {
  fromAPI(data: GetOrganization): Organization {
    return {
      id: data.id,
      name: data.name,
      acronym: data.acroyn,
      emailDomain: data.email,
    };
  }

  fromAPINested(data: GetOrganizationNested): Organization {
    return {
      id: data.id,
      name: data.orgasnimo,
      acronym: data.siglas,
      emailDomain: "",
    };
  }
}
