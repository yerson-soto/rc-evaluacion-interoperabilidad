import { APIResponse } from "library/common/interfaces";
import { AnswerEvidence, CompletedQuestion } from "library/models/Question";
import { AnswerResult } from "library/models/AnswerResult";
import { AbstractAPIService } from "./AbstractApiService";
import { QuestionMapper } from "../mappers/QuestionMapper";
import * as dto from "library/api/dto/question-dto";

export interface QuestionRepository {
  getCompletedByEvaluation: (evaluationId: number) => Promise<CompletedQuestion[]>;
  updateAnswer: (data: dto.UpdateAnswer) => Promise<AnswerResult>;
  updateEvidences: (
    answerResultId: string, 
    choiceId: number, 
    evidences: AnswerEvidence[]
  ) => Promise<AnswerEvidence[]>;
}

export class QuestionService extends AbstractAPIService implements QuestionRepository {
  mapper: QuestionMapper;

  constructor() {
    super();
    this.mapper = new QuestionMapper();
  }

  getCompletedByEvaluation(evaluationId: number): Promise<CompletedQuestion[]> {
    return new Promise((resolve, reject) => {
      const url = `/evaluationInstitutionalFile/${evaluationId}`
      this.client.get<APIResponse<dto.GetQuestion[]>>(url)
        .then(res => {
          const mapper = this.mapper.fromAPICompleted.bind(this.mapper);
          const questions = res.data.result.map(mapper);
          resolve(questions);
        })
        .catch(() => reject("Error al obtener las preguntas"));
    })
  }

  updateAnswer(data: dto.UpdateAnswer): Promise<AnswerResult> {
    return new Promise((resolve, reject) => {
      this.client
        .post<APIResponse<dto.GetAnswerResult>>(
          "/evaluationtechnics", 
          data
        )
        .then((res) => {
          const questionMapper = new QuestionMapper();
          const result = questionMapper.answerResultFromAPI(res.data.result);
          resolve(result);
        })
        .catch(() => reject("Error al cambiar el nivel"));
    });
  }

  updateEvidences(
    answerResultId: string, choiceId: number, evidences: AnswerEvidence[]
  ): Promise<AnswerEvidence[]> {
    return new Promise(async (resolve, reject) => {
      const formData = await this.mapper.answerEvidencesToFormData(evidences),
        params: dto.UpdateEvidencesParams = {
          evaluationTechnicsId: answerResultId,
          responseId: choiceId
        },
        headers = {
          "Content-Type": "multipart/form-data"
        };
      
      this.client
        .post<APIResponse<dto.GetAnswerEvidence[]>>("/file", formData, { params, headers })
        .then((res) => {
          const mapper = this.mapper.answerEvidencesFromAPI,
            response = res.data.result;

          const newEvidences: AnswerEvidence[] = response.map(mapper);
          resolve(newEvidences);
        })
        .catch(() => reject("Error al actualizar archivos"));
    });
  }
}

