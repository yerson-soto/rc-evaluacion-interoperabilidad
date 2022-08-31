import { Choice } from "library/models/Choice";
import { AbstractCrudService } from "./AbstractCrudService";
import { ChoiceMapper } from "library/api/mappers/ChoiceMapper";
import { ChoiceFormSchema } from "features/ChoiceCrud/ChoiceForm/ChoiceFormSchema";
import { APIResponse } from "library/common/interfaces";
import { AnswerEvidence } from "library/models/Question";
import * as dto from "library/api/dto/choice-dto";

export interface ChoiceRepository {
  getByCriterion: (criterionId: number) => Promise<Choice[]>;
  updateAnswer: (data: dto.UpdateAnswer) => Promise<Choice>;
  updateEvidences: (
    answerResultId: string, 
    choiceId: number, 
    evidences: AnswerEvidence[]
  ) => Promise<AnswerEvidence[]>;
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

  updateAnswer(data: dto.UpdateAnswer): Promise<Choice> {
    return new Promise((resolve, reject) => {
      this.client
        .post<APIResponse<dto.GetChoice>>("/evaluationtechnics", data)
        .then((res) => {
          const choiceMapper = new ChoiceMapper();
          const choice: Choice = choiceMapper.fromAPI(res.data.result);
          resolve(choice);
        })
        .catch(() => reject("Error al cambiar el nivel"));
    });
  }

  updateEvidences(
    answerResultId: string, choiceId: number, evidences: AnswerEvidence[]
  ): Promise<AnswerEvidence[]> {
    return new Promise((resolve, reject) => {
      const choiceMapper = new ChoiceMapper(),
        formData = choiceMapper.answerEvidencesToFormData(evidences),
        params: dto.UpdateEvidencesParams = {
          evaluationTechnicsId: answerResultId,
          responseId: choiceId
        }
      
      this.client
        .post<APIResponse<dto.GetAnswerEvidence[]>>("/file", formData, { params })
        .then((res) => {
          const mapper = choiceMapper.answerEvidencesFromAPI,
            response = res.data.result;

          const newEvidences: AnswerEvidence[] = response.map(mapper);
          resolve(newEvidences);
        })
        .catch(() => reject("Error al actualizar archivos"));
    });
  }
}

