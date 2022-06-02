import { AxiosInstance } from "axios";
import { Evaluation } from "library/models/Evaluation";
import { Response } from "library/common/interfaces";
import { EvaluationRepository, GetEvaluation } from "library/repositories/EvaluationRepository";
import { GetPaginatedEvaluation } from 'library/repositories/EvaluationRepository';
import { CommonRepository } from 'library/repositories/CommonRepository';

import backend from 'main/api';

export class EvaluationService implements CommonRepository<Evaluation>, EvaluationRepository  {
  private client!: AxiosInstance;

  constructor() {
    this.client = backend;
  }
  
  getAll(): Promise<Evaluation[]> { 
    return new Promise((resolve, reject) => {
      this.client.get<Response<GetPaginatedEvaluation>>('/evaluations/1/5/a')
        .then(res => {
          const { result: { evaluationInstitutionalsResponse} } = res.data;
          const evaluations = evaluationInstitutionalsResponse.map(this.mapResult);
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
