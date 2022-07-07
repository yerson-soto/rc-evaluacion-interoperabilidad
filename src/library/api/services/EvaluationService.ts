import { Evaluation } from "library/models/Evaluation";
import { APIResponse } from "library/common/interfaces";
import { EvaluationRepository, GetEvaluation } from "library/api/repositories/EvaluationRepository";
import { GetPaginatedEvaluation } from 'library/api/repositories/EvaluationRepository';
import { APIService } from './ApiService';

export class EvaluationService extends APIService implements EvaluationRepository  {
  
  getAll(): Promise<Evaluation[]> { 
    return new Promise((resolve, reject) => {
      this.client.get<APIResponse<GetPaginatedEvaluation>>('/evaluationsinstitutional/1/25')
        .then(res => {
          const results = res.data.result.evaluations;
          const evaluations = results.map(this.mapResult);
          resolve(evaluations);
        })
        .catch(() => reject('No se pudo cargar las evaluaciones'))
    });
  }

  createNew(organization: number): Promise<Evaluation> {
    return new Promise((resolve, reject) => {
      this.client.post<APIResponse<GetEvaluation>>('/evaluationsinstitutional', {
        organismoId: organization
      })
        .then(res => {
          const evaluation = this.mapResult(res.data.result);
          resolve(evaluation);
        })
        .catch(() => reject('Error al crear la evaluación'))
    });
  }
  
  mapResult(result: GetEvaluation): Evaluation {    
    return {
      uid: result.id,
      score: Number(result.currentLevel.toFixed(2)),
      organization: {
        id: result.organismo.id,
        name: result.organismo.orgasnimo,
        acronym: result.organismo.siglas
      },
      dateCreated: result.dateInitial
    }
  }
}
