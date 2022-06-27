import { Criterion } from "library/models/Criterion";
import { CriterionRepository } from "library/repositories/CriterionRepository";
import { GetCriterion } from "library/repositories/CriterionRepository";
import { APIService } from './ApiService';
import { Response } from "library/common/interfaces";

export class CriterionService extends APIService implements CriterionRepository {
  getByDomain(domainId: number): Promise<Criterion[]> {
    return new Promise((resolve, reject) => {
      this.client.get<Response<GetCriterion[]>>(`/criterions/${domainId}`)
        .then(res => {
          const criterions = res.data.result.map(this.mapResult)
          resolve(criterions);
        })
        .catch(() => reject('No se pudo cargar los criterios'))
    });
  }

  mapResult(result: GetCriterion): Criterion {
    return {
      id: result.id,
      name: result.description,
      categories: result.lineaments.map(lineament => ({
        id: lineament.id,
        nomenclature: lineament.description,
        description: lineament.definictionLineament
      }))
    };
  }
}
