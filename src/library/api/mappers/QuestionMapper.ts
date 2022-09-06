import * as dto from "../dto/question-dto";
import { AnswerEvidence, CompletedQuestion } from "library/models/Question";
import { ContentType } from "library/common/enums";
import { AnswerResult } from 'library/models/AnswerResult';
import { ChoiceMapper } from './ChoiceMapper';
import { CriterionMapper } from './CriterionMapper';

export class QuestionMapper {

  fromAPICompleted(data: dto.GetQuestion): CompletedQuestion {
    const criterionMapper = new CriterionMapper();
    const choiceMapper = new ChoiceMapper();
    console.log('got here',data.fileEvaluationResponses.map(this.answerEvidencesFromAPI))
    return {
      criterion: criterionMapper.fromAPI(data.criterionResponse),
      choosenAnswer: choiceMapper.fromAPI(data.responses),
      answerEvidences: data.fileEvaluationResponses.map(this.answerEvidencesFromAPI)
    }
  }

  answerResultFromAPI(data: dto.GetAnswerResult): AnswerResult {
    const choiceMapper = new ChoiceMapper();
    const choice = choiceMapper.fromAPI(data.response);

    return {
      uid: data.evaluationTechnicsId,
      overallScore: data.resultFinally,
      choice
    };
  }

  async answerEvidencesToFormData(evidences: AnswerEvidence[]): Promise<FormData> {
    const formData = new FormData();
    const fetchFiles = evidences.map(e => fetch(e.file.url));
    const filePromises = await Promise.all(fetchFiles)
      .then(responses => responses.map(res => res.arrayBuffer()));

    const blobFiles = await Promise.all(filePromises);
    
    evidences.forEach(async (evidence, index) => {
      const { file } = evidence;
      const ext = file.name.split('.').pop() || '';
      const fileName = `${evidence.id}.${ext}`;
      console.log(evidence.title, fileName)
      const uploadFile = new File([blobFiles[index]], fileName, { type: file.type })
      formData.append('files', uploadFile);
    });

    return formData;
  }

  answerEvidencesFromAPI(data: dto.GetAnswerEvidence): AnswerEvidence {
    const { id, title, contentType } = data.requiredEvidencesResponse;
    const baseUrl = process.env.REACT_APP_API_URL;
    const cleanPath = data.url.replace(/[\\\\]/g, '/');
    const url = baseUrl + '/' + cleanPath;
    
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
}
