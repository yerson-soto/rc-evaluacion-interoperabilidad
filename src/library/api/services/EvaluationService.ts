import { Evaluation } from "library/models/Evaluation";
import { APIResponse } from "library/common/interfaces";
import { EvaluationRepository } from "library/api/repositories/EvaluationRepository";
import { AbstractAPIService } from "./AbstractApiService";
import * as dto from "library/api/dto/evaluation-dto";

export class EvaluationService
  extends AbstractAPIService
  implements EvaluationRepository
{
  getAll(): Promise<Evaluation[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<APIResponse<dto.GetPaginatedEvaluation>>(
          "/evaluationsinstitutional/1/25"
        )
        .then((res) => {
          const results = res.data.result.evaluations;
          const evaluations = results.map(this.mapResult);
          resolve(evaluations);
        })
        .catch(() => reject("No se pudo cargar las evaluaciones"));
    });
  }

  createNew(organization: number): Promise<Evaluation> {
    return new Promise((resolve, reject) => {
      this.client
        .post<APIResponse<dto.GetEvaluation>>("/evaluationsinstitutional", {
          organismoId: organization,
        })
        .then((res) => {
          const evaluation = this.mapResult(res.data.result);
          resolve(evaluation);
        })
        .catch(() => reject("Error al crear la evaluación"));
    });
  }

  mapResult(result: dto.GetEvaluation): Evaluation {
    return {
      uid: result.id,
      score: Number(result.currentLevel.toFixed(2)),
      organization: {
        id: result.organismo.id,
        name: result.organismo.orgasnimo,
        emailDomain: 'map.gob.do',
        acronym: result.organismo.siglas,
      },
      dateCreated: result.dateInitial,
    };
  }
}
