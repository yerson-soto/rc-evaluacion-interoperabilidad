import { Choice } from "library/models/Choice";
import { ChoiceRepository } from "library/api/repositories/ChoiceRepository";
import { GetChoice } from "library/api/repositories/ChoiceRepository";
import { APIService } from "./ApiService";
import { APIResponse } from "library/common/interfaces";


export class ChoiceService extends APIService implements ChoiceRepository {
  getByCriterion(criterionId: number): Promise<Choice[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<APIResponse<GetChoice[]>>(`/responses/${criterionId}`)
        .then((res) => {
          console.log("res", res.data);
          const choiceList = res.data.result;

          const mappedChoices = choiceList.map((choice) => {
            return this.mapResult(choice);
          });
          resolve(mappedChoices);
        })
        .catch(() => reject("No se pudo cargar las respuestas"));
    });
  }

  mapResult(result: GetChoice): Choice {
    return {
      id: result.responsesId,
      details: result.responseDecription,
      level: {
        id: result.levels.levelsId,
        name: result.levels.description,
        value: result.levels.levelValue,
      },
    };
  }
}
