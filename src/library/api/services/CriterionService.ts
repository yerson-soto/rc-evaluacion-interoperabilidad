import { FullCriterion } from "library/models/Criterion";
import { APIResponse } from "library/common/interfaces";
import { Criterion } from "library/models/Criterion";
import { AbstractCrudService } from "./AbstractCrudService";
import { CriterionMapper } from "library/api/mappers/CriterionMapper";
import { CriterionFormSchema } from "features/CriterionCrud/CriterionForm/CriterionFormSchema";
import * as dto from "library/api/dto/criterion-dto";

export interface CriterionRepository {
  getByDomain: (domainId: number) => Promise<FullCriterion[]>;
}

export class CriterionService extends AbstractCrudService<
  Criterion,
  dto.GetCriterion,
  dto.CreateCriterion,
  CriterionFormSchema
> implements CriterionRepository {
  mapper: CriterionMapper;
  getAllUrl: string;
  createUrl: string;

  constructor() {
    super();
    this.mapper = new CriterionMapper();
    this.getAllUrl = "/criterion";
    this.createUrl = "/criterion";
  }
  
  getDetailUrl(id: number): string {
    return "/criterion/" + id.toString();
  };

  getDetailed(): Promise<FullCriterion[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<APIResponse<dto.GetCriterion[]>>('/criterions')
        .then((res) => {
          const mapper = this.mapper.fromAPIFull.bind(this.mapper);
          const results = res.data.result.map(mapper);
          resolve(results);
        })
        .catch(() => reject("No se pudo cargar los criterios"));
    });
  }

  getByDomain(domainId: number): Promise<FullCriterion[]> {
    return new Promise((resolve, reject) => {
      const url = "/criterions/" + domainId;
      
      this.client
        .get<APIResponse<dto.GetCriterion[]>>(url)
        .then((res) => {
          const criterions = res.data.result.map(this.mapper.fromAPIFull);
          resolve(criterions);
        })
        .catch(() => reject("No se pudo cargar los criterios"));
    });
  }
}
