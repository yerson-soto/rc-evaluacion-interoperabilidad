import { Evaluation } from "library/models/Evaluation";
import { APIResponse, Pagination } from "library/common/interfaces";
import { AbstractCrudService } from "./AbstractCrudService";
import { EvaluationFormSchema } from "features/EvaluationCrud/EvaluationForm/EvaluationFormSchema";
import { EvaluationMapper } from "library/api/mappers/EvaluationMapper";
import * as dto from "library/api/dto/evaluation-dto";

export interface EvaluationRepository {
  getPage: (page: number) => Promise<Pagination<Evaluation>>
}

export class EvaluationService extends AbstractCrudService<
  Evaluation,
  dto.GetEvaluation,
  dto.CreateEvaluation,
  EvaluationFormSchema
> implements EvaluationRepository {

  mapper: EvaluationMapper;
  getAllUrl: string;
  createUrl: string;

  constructor() {
    super();
    this.mapper = new EvaluationMapper();
    this.getAllUrl = "/evaluationsinstitutional/1/10";
    this.createUrl = "/evaluationsinstitutional";
  }

  getDetailUrl(uid: string): string {
    return "/evaluationsinstitutional/" + uid;
  };
  
  getAll(): Promise<Evaluation[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<APIResponse<dto.GetPaginatedEvaluation>>(this.getAllUrl)
        .then((res) => {
          const results = res.data.result.evaluations;
          const evaluations = results.map(this.mapper.fromAPI);
          resolve(evaluations);
        })
        .catch(() => reject("No se pudo cargar las evaluaciones"));
    });
  }

  getPage(page: number): Promise<Pagination<Evaluation>> {
    return new Promise((resolve, reject) => {
      const url = `/evaluationsinstitutional/${page}/5`;
      
      this.client
        .get<APIResponse<dto.GetPaginatedEvaluation>>(url)
        .then((res) => {
          const pagination = this.mapper.fromAPIPaginated(res.data.result);
          resolve(pagination);
        })
        .catch(() => reject("No se pudo cargar las evaluaciones"));
    });
  }
}
