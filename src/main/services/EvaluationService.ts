import { AxiosInstance } from "axios";
import { Evaluation } from "library/models/Evaluation";
import { Response } from "library/common/interfaces";
import { EvaluationRepository, GetEvaluation } from "library/repositories/EvaluationRepository";
import { GetPaginatedEvaluation } from 'library/repositories/EvaluationRepository';
import { APIService } from './ApiService';

export class EvaluationService extends APIService implements EvaluationRepository  {
  
  getAll(): Promise<Evaluation[]> { 
    return new Promise((resolve, reject) => {
      this.client.get<Response<GetPaginatedEvaluation>>('/evaluations/1/10')
        .then(res => {
          const results = res.data.result.evaluations;
          const evaluations = results.map(this.mapResult);
          resolve(evaluations);
        })
        .catch(() => reject('No se pudo cargar las evaluaciones'))
    });
  }
   
  mapResult(result: GetEvaluation): Evaluation {
    return {
      uuid: result.id,
      organization: {
        id: result.organismo.id,
        name: result.organismo.orgasnimo,
        acronym: result.organismo.siglas
      },
      domains: [
        {
          id: result.domain.id,
          name: result.domain.description
        }
      ],
      dateCreated: result.dateInitial
    }
  }
}
