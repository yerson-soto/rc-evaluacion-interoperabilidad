import { AbstractAPIService } from './AbstractApiService';
import { APIResponse } from "library/common/interfaces";
import { OrganizationRepository } from 'library/api/repositories/OrganizationRepository';
import { Organization } from "library/models/Organization";
import { GetOrganization } from 'library/api/dto/organization-dto';

export class OrganizationService extends AbstractAPIService implements OrganizationRepository {
  
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
      emailDomain: result.email,
      acronym: result.acroyn
    };
  }
}
