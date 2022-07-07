import { Domain } from "library/models/Domain";
import { GetDomain } from "library/api/repositories/DomainRepository";
import createSlug from "library/helpers/create-slug";
import capitalize from "library/helpers/capitalize";

export class DomainMapper {
  static fromAPI(result: GetDomain): Domain {
    const domainName = result.description
      .toLowerCase()
      .replace("dominio", "")
      .trim();
    const name = capitalize(domainName);

    return {
      id: result.id,
      name: "Dominio " + name,
      slug: createSlug(name),
    };
  }

  static toAPI(domain: Domain): GetDomain {
    return {
      id: domain.id,
      description: domain.name,
    };
  }

  static cleanName(name: string): string {
    const domainName = name.toLowerCase().replace("dominio", "").trim();
    return capitalize(domainName);
  }
}
