import { Domain } from "library/models/Domain";
import { DomainRepository } from "library/repositories/DomainRepository";
import { GetDomain } from "library/repositories/DomainRepository";
import { APIService } from './ApiService';
import { Response } from "library/common/interfaces";

export class DomainService extends APIService implements DomainRepository {
  getAll(): Promise<Domain[]> {
    return new Promise((resolve, reject) => {
      this.client.get<Response<GetDomain[]>>('/domains')
        .then(res => {
          const domains = res.data.result.map(this.mapResult)
          resolve(domains);
        })
        .catch(() => reject('No se pudo cargar los dominios'))
    });
  }

  mapResult(result: GetDomain): Domain {
    return {
      id: result.id,
      name: result.description
    };
  }
}
