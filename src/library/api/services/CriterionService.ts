import { FullCriterion } from "library/models/Criterion";
import { APIResponse } from "library/common/interfaces";
import { Choice } from "library/models/Choice";
import { Criterion } from "library/models/Criterion";
import { AbstractCrudService } from "./AbstractCrudService";
import { CriterionMapper } from "library/api/mappers/CriterionMapper";
import { CriterionFormSchema } from "features/CriterionCrud/CriterionForm/CriterionFormSchema";
import { GetChoice } from "library/api/dto/choice-dto";
import { ChoiceMapper } from 'library/api/mappers/ChoiceMapper';
import * as dto from "library/api/dto/criterion-dto";

export interface CriterionRepository {
  getByDomain: (domainId: number) => Promise<FullCriterion[]>;
  changeLevel: (data: dto.ChangeLevel) => Promise<Choice>;
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

  getByDomain(domainId: number): Promise<FullCriterion[]> {
    return new Promise((resolve, reject) => {
      const url = "/criterions/" + domainId.toString();
      
      this.client
        .get<APIResponse<dto.GetCriterion[]>>(url)
        .then((res) => {
          const criterions = res.data.result.map(this.mapper.fromAPIFull);
          resolve(criterions);
        })
        .catch(() => reject("No se pudo cargar los criterios"));
    });
  }

  changeLevel(data: dto.ChangeLevel): Promise<Choice> {
    return new Promise((resolve, reject) => {
      this.client
        .post<APIResponse<GetChoice>>("/evaluationtechnics", data)
        .then((res) => {
          const choiceMapper = new ChoiceMapper();
          const choice: Choice = choiceMapper.fromAPI(res.data.result);
          resolve(choice);
        })
        .catch(() => reject("Error al cambiar el nivel"));
    });
  }
}

