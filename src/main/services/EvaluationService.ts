import { AxiosInstance } from "axios";
import { Evaluation } from "library/models/Evaluation";
import { Response } from "library/models/Response";
import { EvaluationRepository, GetEvaluation } from "library/repositories/EvaluationRepository";

import backend from 'main/api';

export class EvaluationService implements EvaluationRepository {
  private client!: AxiosInstance;

  constructor() {
    this.client = backend;
  }
  
  getEvaluations(): Promise<Evaluation[]> { 
    return new Promise((resolve, reject) => {
      this.client.get<Response<GetEvaluation[]>>('/evaluationinstitutional')
        .then(res => {
          const evaluations = res.data.result.map(this.mapResult);
          resolve(evaluations);
        })
        .catch(() => reject('No se pudo cargar las evaluaciones'))
    });
  }

  mapResult(result: GetEvaluation): Evaluation {
    return {
      uuid: result.id,
      organizationId: result.organismoId,
      dateCreated: result.dateInitial
    }
  }
}
