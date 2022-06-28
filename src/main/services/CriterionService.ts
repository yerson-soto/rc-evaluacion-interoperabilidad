import { Criterion } from "library/models/Criterion";
import { CriterionRepository } from "library/repositories/CriterionRepository";
import { GetCriterion } from "library/repositories/CriterionRepository";
import { APIService } from "./ApiService";
import { Response } from "library/common/interfaces";
import chroma from "chroma-js";

export class CriterionService
  extends APIService
  implements CriterionRepository
{
  getByDomain(domainId: number): Promise<Criterion[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<Response<GetCriterion[]>>(`/criterions/${domainId}`)
        .then((res) => {
          const criterions = res.data.result.map(this.mapResult);
          resolve(criterions);
        })
        .catch(() => reject("No se pudo cargar los criterios"));
    });
  }

  mapResult(result: GetCriterion): Criterion {
    const colors = chroma
      .scale(["#ef8269", "#fba31e", "#2ac158"])
      .colors(result.responses.length);

    return {
      id: result.id,
      name: result.description,
      categories: result.lineaments.map((lineament) => ({
        id: lineament.id,
        nomenclature: lineament.description,
        description: lineament.definictionLineament,
      })),
      choices: result.responses.map((response, index) => ({
        id: response.responsesId,
        details: response.responseDecription,
        hexColor: colors[index],
        level: {
          id: response.levelsResponse.levelsId,
          name: response.levelsResponse.description,
          value: response.levelsResponse.levelValue,
        },
      })),
    };
  }
}
