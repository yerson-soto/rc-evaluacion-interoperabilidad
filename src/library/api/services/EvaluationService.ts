import { Evaluation } from 'library/models/Evaluation';
import { APIResponse, FilterValues, Pagination } from "library/common/interfaces";
import { AbstractCrudService } from "./AbstractCrudService";
import { EvaluationFormSchema } from "features/EvaluationList/EvaluationForm/EvaluationFormSchema";
import { EvaluationMapper } from "library/api/mappers/EvaluationMapper";
import { PaginateRepository } from './AbstractListService';
import { ManagerId } from "library/common/types";
import * as dto from "library/api/dto/evaluation-dto";


export interface EvaluationRepository extends PaginateRepository<Evaluation, ManagerId> {
  getTimeline: (institutionId: number) => Promise<Evaluation[]>;
  finish: (uid: string) => Promise<Evaluation>;
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
  
  paginate(
    page: number, 
    values: FilterValues<Evaluation>,
    managerId: ManagerId
  ): Promise<Pagination<Evaluation>> {
    return new Promise((resolve, reject) => {
    const url = `/evaluationsinstitutional/${managerId}/${page}/10`;
      const params = this.mapper.fromFilterToQueryParams(values);
      
      this.client
        .get<APIResponse<dto.GetPaginatedEvaluation>>(url, { params })
        .then((res) => {
          const pagination = this.mapper.fromAPIPaginated(res.data.result);
          resolve(pagination);
        })
        .catch(() => reject("No se pudo cargar las evaluaciones"));
    });
  }

  getTimeline(institutionId: number): Promise<Evaluation[]> {
    return new Promise((resolve, reject) => {
      const url = `evaluationInstitutional/history/${institutionId}`;
      this.client
        .get<APIResponse<dto.GetEvaluation[]>>(url)
        .then((res) => {
          const results = res.data.result;
          const evaluations = results.map(this.mapper.fromAPI);
          resolve(evaluations);
        })
        .catch(() => reject("backend.timeline_couldnt_load"));
    });
  }
  
  finish(uid: string): Promise<Evaluation> {
    return new Promise((resolve, reject) => {
      const url = `/evaluationinstitutional/finally/${uid}`;
      this.client.put<APIResponse<dto.GetEvaluation>>(url)
        .then(res => {
          const evaluation = this.mapper.fromAPI(res.data.result);
          resolve(evaluation);
        })
        .catch(() => reject("Por favor, complete la evaluación para poder finalizar"))
    })
  }
}
