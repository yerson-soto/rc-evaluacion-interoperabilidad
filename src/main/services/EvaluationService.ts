import { AxiosInstance } from "axios";
import { Evaluation } from "library/models/Evaluation";
import { Response } from "library/common/interfaces";
import { EvaluationRepository, GetEvaluation } from "library/repositories/EvaluationRepository";
import { GetPaginatedEvaluation } from 'library/repositories/EvaluationRepository';
import { APIService } from './ApiService';

export class EvaluationService extends APIService implements EvaluationRepository  {
  
  getAll(): Promise<Evaluation[]> { 
    return new Promise((resolve, reject) => {
      this.client.get<Response<GetPaginatedEvaluation>>('/evaluationsinstitutional/1/25')
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
      this.client.post<Response<GetEvaluation>>('/evaluationsinstitutional', {
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
    const scores = [1.4, 4.5, 3.2, 5, 0.3, 4.5, 4, 1, 3];
    
    return {
      uid: result.id,
      score: scores[Math.floor(Math.random() * scores.length)],
      organization: {
        id: result.organismo.id,
        name: result.organismo.orgasnimo,
        acronym: result.organismo.siglas
      },
      dateCreated: result.dateInitial
    }
  }
}
