import { Domain } from "library/models/Domain";
import { DomainRepository } from "library/api/repositories/DomainRepository";
import { GetDomain } from "library/api/repositories/DomainRepository";
import { APIService } from './ApiService';
import { APIResponse } from "library/common/interfaces";
import { CrudService, Mapper } from './CrudService';
import capitalize from 'library/helpers/capitalize';
import createSlug from "library/helpers/create-slug";
import { DomainMapper } from '../mappers/DomainMapper';

export class DomainService extends CrudService<Domain> implements DomainRepository {
  mapper: Mapper<Domain> = DomainMapper;

  mapResult(result: GetDomain): Domain {
    const name = this.cleanName(result.description);
    
    return {
      id: result.id,
      name: 'Dominio ' + name,
      slug: createSlug(name)
    };
  }

  cleanName(name: string): string {
    const domainName = name.toLowerCase().replace('dominio', '').trim();
    return capitalize(domainName);
  }
}
