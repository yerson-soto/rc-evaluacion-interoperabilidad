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
import { data } from '../../../features/MaturityModel/TableVersion/data';

export interface CriterionRepository {
  getByDomain: (domainId: number) => Promise<FullCriterion[]>;
  changeAnswer: (data: dto.ChangeAnswer) => Promise<Choice>;
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
      const results: any = data;
      const mapper = this.mapper.fromAPIFull.bind(this.mapper);
      const ret: FullCriterion[] = results.map(mapper);
      resolve(ret);
      // this.client
      //   .get<APIResponse<dto.GetCriterion[]>>(this.getAllUrl)
      //   .then((res) => {
      //     const mapper = this.mapper.fromAPIFull.bind(this.mapper);
      //     const results = res.data.result.map(mapper);
      //     resolve(results);
      //   })
      //   .catch(() => reject("No se pudo cargar los criterios"));
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

  changeAnswer(data: dto.ChangeAnswer): Promise<Choice> {
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
