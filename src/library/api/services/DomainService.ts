import { Domain } from "library/models/Domain";
import { DomainRepository } from "library/api/repositories/DomainRepository";
import { GetDomain } from "library/api/repositories/DomainRepository";
import { APIService } from './ApiService';
import { APIResponse } from "library/common/interfaces";
import capitalize from 'library/helpers/capitalize';
import createSlug from "library/helpers/create-slug";

export class DomainService extends APIService implements DomainRepository {
  getAll(): Promise<Domain[]> {
    return new Promise((resolve, reject) => {
      this.client.get<APIResponse<GetDomain[]>>('/domains')
        .then(res => {
          const domains = res.data.result.map(this.mapResult.bind(this))
          resolve(domains);
        })
        .catch(() => reject('No se pudo cargar los dominios'))
    });
  }

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




