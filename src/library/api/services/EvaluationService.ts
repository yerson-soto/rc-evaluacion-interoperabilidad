import { Evaluation } from "library/models/Evaluation";
import { APIResponse } from "library/common/interfaces";
import * as dto from "library/api/dto/evaluation-dto";
import { AbstractCrudService } from "./AbstractCrudService";
import { EvaluationFormSchema } from "features/EvaluationCrud/EvaluationForm/EvaluationFormSchema";
import { EvaluationMapper } from "library/api/mappers/EvaluationMapper";

export class EvaluationService extends AbstractCrudService<
  Evaluation,
  dto.GetEvaluation,
  dto.CreateEvaluation,
  EvaluationFormSchema
> {

  mapper: EvaluationMapper;
  getAllUrl: string;
  createUrl: string;

  constructor() {
    super();
    this.mapper = new EvaluationMapper();
    this.getAllUrl = `/evaluationsinstitutional/1/10`;
    this.createUrl = "evaluationsinstitutional";
  }

  getDetailUrl(uid: string): string {
    return "/evaluationsinstitutional/" + uid;
  };
  
  getAll(): Promise<Evaluation[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<APIResponse<dto.GetPaginatedEvaluation>>(
          "/evaluationsinstitutional/1/25"
        )
        .then((res) => {
          const results = res.data.result.evaluations;
          const evaluations = results.map(this.mapper.fromAPI);
          resolve(evaluations);
        })
        .catch(() => reject("No se pudo cargar las evaluaciones"));
    });
  }

  pagination(page: number, pageSize: number): void {
    this.getAllUrl = `/evaluationsinstitutional/${page}/${pageSize}`;
  }

  // createNew(organization: number): Promise<Evaluation> {
  //   return new Promise((resolve, reject) => {
  //     this.client
  //       .post<APIResponse<dto.GetEvaluation>>("/evaluationsinstitutional", {
  //         organismoId: organization,
  //       })
  //       .then((res) => {
  //         const evaluation = this.mapResult(res.data.result);
  //         resolve(evaluation);
  //       })
  //       .catch(() => reject("Error al crear la evaluación"));
  //   });
  // }
}
