import { Choice } from "library/models/Choice";
import { ChoiceRepository } from "library/repositories/ChoiceRepository";
import { GetChoice } from "library/repositories/ChoiceRepository";
import { APIService } from "./ApiService";
import { Response } from "library/common/interfaces";
import chroma from "chroma-js";

export class ChoiceService extends APIService implements ChoiceRepository {
  getByCriterion(criterionId: number): Promise<Choice[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<Response<GetChoice[]>>(`/responses/${criterionId}`)
        .then((res) => {
          console.log("res", res.data);
          const choiceList = res.data.result;
          const colors = chroma
            .scale(["#ef8269", "#fba31e", "#2ac158"])
            .colors(choiceList.length);

          const mappedChoices = choiceList.map((choice, index) => {
            return this.mapResult(choice, colors[index]);
          });
          resolve(mappedChoices);
        })
        .catch(() => reject("No se pudo cargar las respuestas"));
    });
  }

  mapResult(result: GetChoice, color: string): Choice {
    return {
      id: result.responsesId,
      details: result.responseDecription,
      hexColor: color,
      level: {
        id: result.levels.levelsId,
        name: result.levels.description,
        value: result.levels.levelValue,
      },
    };
  }
}
