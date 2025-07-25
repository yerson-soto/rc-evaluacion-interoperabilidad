import { Choice } from "library/models/Choice";
import { AbstractCrudService } from "./AbstractCrudService";
import { ChoiceMapper } from "library/api/mappers/ChoiceMapper";
import { ChoiceFormSchema } from "features/ChoiceCrud/ChoiceForm/ChoiceFormSchema";
import { APIResponse } from "library/common/interfaces";
import * as dto from "library/api/dto/choice-dto";

export interface ChoiceRepository {
  getByCriterion: (criterionId: number) => Promise<Choice[]>;
}

export class ChoiceService extends AbstractCrudService<
  Choice,
  dto.GetChoice,
  dto.CreateChoice,
  ChoiceFormSchema
> implements ChoiceRepository {
  mapper: ChoiceMapper;
  getAllUrl: string;
  createUrl: string;

  constructor() {
    super();
    this.mapper = new ChoiceMapper();
    this.getAllUrl = "/responses";
    this.createUrl = "/responses";
  }
  
  getDetailUrl(id: number): string {
    return "/responses/" + id.toString();
  };
  
  getByCriterion(criterionId: number): Promise<Choice[]> {
    return new Promise((resolve, reject) => {
      this.client
        .get<APIResponse<dto.GetChoice[]>>(`/responses/${criterionId}`)
        .then((res) => {
          const choiceList = res.data.result;

          const mappedChoices = choiceList.map((choice) => {
            return this.mapper.fromAPI(choice);
          });
          resolve(mappedChoices);
        })
        .catch(() => reject("No se pudo cargar las respuestas"));
    });
  }
}

