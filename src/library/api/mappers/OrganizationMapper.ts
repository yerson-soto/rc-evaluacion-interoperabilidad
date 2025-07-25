import { Organization } from "library/models/Organization";
import { GetOrganizationNested, GetOrganization } from "../dto/organization-dto";
import { DefaultOptionType } from "antd/lib/select";
import { Mapper } from 'library/common/interfaces';

export class OrganizationMapper implements Mapper<Organization, GetOrganization, any, any> {
  formSchemaToAPI(): any {}
  
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
      acronym: data.siglas?.trim(),
      emailDomain: "",
    };
  }
  
  toSelectOption(org: Organization): DefaultOptionType {
    return {
      label: org.name,
      value: org.id,
    }
  }
}
