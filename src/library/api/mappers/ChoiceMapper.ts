import { Mapper } from "library/common/interfaces";
import { Choice, LightChoice } from "library/models/Choice";
import { GetChoice, CreateChoice } from "../dto/choice-dto";
import { LevelMapper } from './LevelMapper';
import { ChoiceFormSchema } from "features/ChoiceCrud/ChoiceForm/ChoiceFormSchema";
import { CriterionMapper } from './CriterionMapper';
import { ContentType } from 'library/common/enums';


export class ChoiceMapper
  implements Mapper<Choice, GetChoice, CreateChoice, ChoiceFormSchema>
{
  formSchemaToAPI(schema: ChoiceFormSchema): CreateChoice {
    const evidenceList = schema.requiredEvidences || [];
    const requiredEvidences = evidenceList.map(evidence => ({
      title: evidence.title,
      contentType: evidence.contentType.join(',')
    }))

    return {
      levelId: schema.levelId,
      criterionId: schema.criterionId,
      responseDecription: schema.details,
      isEvidenceRequired: schema.isEvidenceRequired,
      requiredEvidencesRequests: requiredEvidences
    };
  }

  fromAPI(data: GetChoice): Choice {
    const levelMapper = new LevelMapper();
    const criterionMapper = new CriterionMapper();
    
    return {
      id: data.responsesId,
      details: data.responseDecription,
      level: levelMapper.fromAPI(data.levelsResponse),
      criterion: criterionMapper.fromAPI(data.criterionResponse),
      isEvidenceRequired: data.isEvidenceRequired,
      requiredEvidences: data.requiredEvidencesResponses.map(evidence => ({
        title: evidence.title,
        contentType: evidence.contentType.split(',') as ContentType[]
      }))
    };
  }

  fromAPILight(data: GetChoice): LightChoice {
    const levelMapper = new LevelMapper();
    
    return {
      id: data.responsesId,
      details: data.responseDecription,
      level: levelMapper.fromAPI(data.levelsResponse)
    };
  }
}
