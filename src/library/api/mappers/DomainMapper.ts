import { Domain } from "library/models/Domain";
import { DefaultOptionType } from "antd/lib/select";
import { GetDomain, CreateDomain } from "library/api/dto/domain-dto";
import { Mapper } from "library/common/interfaces";
import { DomainFormSchema } from "features/DomainCrud/DomainForm/DomainFormSchema";
import capitalize from "library/helpers/capitalize";

export class DomainMapper
  implements Mapper<Domain, GetDomain, CreateDomain, DomainFormSchema>
{
  formSchemaToAPI(schema: DomainFormSchema): CreateDomain {
    return {
      description: schema.name,
      acronym: schema.acronym,
      slug: schema.slug,
    };
  }

  fromAPI(data: GetDomain): Domain {
    return {
      id: data.id,
      color: data.color || "#e2efdb",
      name: capitalize(data.description),
      slug: data.slug || "",
      acronym: data.acronym || "",
    };
  }

  toSelectOption(domain: Domain): DefaultOptionType {
    return {
      label: `${domain.name} (${domain.acronym})`,
      value: domain.id,
    };
  }
}
