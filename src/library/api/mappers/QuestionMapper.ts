import { Mapper } from "library/common/interfaces";
import * as dto from "../dto/question-dto";
import { AnswerEvidence } from "library/models/Question";
import { ContentType } from "library/common/enums";
import { AnswerResult } from 'library/models/AnswerResult';
import { ChoiceMapper } from './ChoiceMapper';

export class QuestionMapper {

  answerResultFromAPI(data: dto.GetAnswerResult): AnswerResult {
    const choiceMapper = new ChoiceMapper();
    const choice = choiceMapper.fromAPI(data.response);

    return {
      uid: data.evaluationTechnicsId,
      overallScore: data.resultFinally,
      choice
    };
  }

  answerEvidencesFromAPI(data: dto.GetAnswerEvidence): AnswerEvidence {
    const { id, title, contentType } = data.requiredEvidences;
    // const baseUrl = process.env.REACT_APP_API_URL;
    const baseUrl = "https://c1491/Evaluacion_Institucional";
    const cleanPath = data.url.replace(/[\\\\]/g, '/');
    const url =  baseUrl + '/' + cleanPath;
    
    return {
      id,
      title,
      contentType: contentType.split(",") as ContentType[],
      file: {
        url: url,
        name: data.nameFile,
        type: data.typeDocument,
        uid: data.id,
      },
    };
  }

  answerEvidencesToFormData(evidences: AnswerEvidence[]): FormData {
    const formData = new FormData();

    evidences.forEach((evidence) => {
      const { file } = evidence;
      const ext = file.name.split('.').pop() || '';
      const blob = new File([file.url], `${evidence.id}.${ext}`);
      formData.append('files', blob);
    });

    return formData;
  }
}
