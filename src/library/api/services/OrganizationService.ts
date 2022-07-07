import { APIService } from './ApiService';
import { APIResponse } from "library/common/interfaces";
import { GetOrganization, OrganizationRepository } from 'library/api/repositories/OrganizationRepository';
import { Organization } from "library/models/Organization";

export class OrganizationService extends APIService implements OrganizationRepository {
  
  // TODO: DRY
  getAll(): Promise<Organization[]> {
    return new Promise((resolve, reject) => {
      this.client.get<APIResponse<GetOrganization[]>>('/institutions')
        .then(res => {
          const domains = res.data.result.map(this.mapResult)
          resolve(domains);
        })
        .catch(() => reject('No se pudo cargar los dominios'))
    });
  }

  mapResult(result: GetOrganization): Organization {
    return {
      id: result.id,
      name: result.name,
      acronym: result.acroyn
    };
  }
}
