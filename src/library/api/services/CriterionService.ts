import { Criterion } from "library/models/Criterion";
import { ChangeLevel, CriterionRepository, GetChoice } from "library/api/repositories/CriterionRepository";
import { GetCriterion } from "library/api/repositories/CriterionRepository";
import { APIService } from "./ApiService";
import { APIResponse } from "library/common/interfaces";
import { Choice } from "library/models/Choice";

export class CriterionService extends APIService implements CriterionRepository {
  getByDomain(domainId: number): Promise<Criterion[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<APIResponse<GetCriterion[]>>(`/criterions/${domainId}`)
        .then((res) => {
          const criterions = res.data.result.map(this.mapResult.bind(this));
          resolve(criterions);
        })
        .catch(() => reject("No se pudo cargar los criterios"));
    });
  }

  changeLevel(data: ChangeLevel): Promise<Choice> {
    return new Promise((resolve, reject) => {
      this.client.post<APIResponse<GetChoice>>('/evaluationtechnics', data)
        .then(res => {
          const choice: Choice = this.mapChoice(res.data.result);
          resolve(choice);
        })
        .catch(() => reject('Error al cambiar el nivel'))
    })
  }

  mapChoice(data: GetChoice): Choice {
    return {
      id: data.responsesId,
      details: data.responseDecription,
      level: {
        id: data.levelsResponse.levelsId,
        name: data.levelsResponse.description,
        value: data.levelsResponse.levelValue,
      },
    }
  }

  mapResult(result: GetCriterion): Criterion {
    return {
      id: result.id,
      name: result.description,
      categories: result.lineaments.map((lineament) => ({
        id: lineament.id,
        nomenclature: lineament.description,
        description: lineament.definictionLineament,
      })),
      choices: result.responses.map((response) => this.mapChoice(response)),
    };
  }
}
