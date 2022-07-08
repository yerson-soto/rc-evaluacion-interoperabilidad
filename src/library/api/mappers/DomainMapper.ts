import { Domain } from "library/models/Domain";
import { GetDomain, CreateDomain } from "library/api/dto/domain-dto";
import { Mapper } from "library/common/interfaces";
import { AddDomainSchema } from "features/DomainCrud/AddDomain/AddDomainSchema";
import createSlug from "library/helpers/create-slug";
import capitalize from "library/helpers/capitalize";

export class DomainMapper
  implements Mapper<Domain, GetDomain, CreateDomain, AddDomainSchema>
{
  cleanName(name: string): string {
    const domainName = name.toLowerCase().replace("dominio", "").trim();
    return capitalize(domainName);
  }

  formSchemaToAPI(schema: AddDomainSchema): CreateDomain {
    return {
      description: schema.name,
    };
  }

  fromAPI(data: GetDomain): Domain {
    const name = this.cleanName(data.description);

    return {
      id: data.id,
      name: "Dominio " + name,
      slug: createSlug(name),
    };
  }
}
