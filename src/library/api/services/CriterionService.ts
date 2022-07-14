import { Criterion } from "library/models/Criterion";
import { CriterionRepository } from "library/api/repositories/CriterionRepository";
import { AbstractAPIService } from "./AbstractApiService";
import { APIResponse } from "library/common/interfaces";
import { Choice } from "library/models/Choice";
import * as dto from "library/api/dto/criterion-dto";
import { LineamentMapper } from '../mappers/LineamentMapper';

export class CriterionService
  extends AbstractAPIService
  implements CriterionRepository
{
  getByDomain(domainId: number): Promise<Criterion[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<APIResponse<dto.GetCriterion[]>>(`/criterions/${domainId}`)
        .then((res) => {
          const criterions = res.data.result.map(this.mapResult.bind(this));
          resolve(criterions);
        })
        .catch(() => reject("No se pudo cargar los criterios"));
    });
  }

  changeLevel(data: dto.ChangeLevel): Promise<Choice> {
    return new Promise((resolve, reject) => {
      this.client
        .post<APIResponse<dto.GetChoice>>("/evaluationtechnics", data)
        .then((res) => {
          const choice: Choice = this.mapChoice(res.data.result);
          resolve(choice);
        })
        .catch(() => reject("Error al cambiar el nivel"));
    });
  }

  mapChoice(data: dto.GetChoice): Choice {
    return {
      id: data.responsesId,
      details: data.responseDecription,
      level: {
        id: data.levelsResponse.levelsId,
        name: data.levelsResponse.description,
        value: data.levelsResponse.levelValue,
      },
    };
  }

  mapResult(result: dto.GetCriterion): Criterion {
    const lineamentMapper = new LineamentMapper();
    
    return {
      id: result.id,
      name: result.description,
      categories: result.lineaments.map(lineamentMapper.fromAPI),
      choices: result.responses.map((response) => this.mapChoice(response)),
    };
  }
}
