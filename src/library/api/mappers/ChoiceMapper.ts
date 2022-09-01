import { Mapper } from "library/common/interfaces";
import { Choice } from "library/models/Choice";
import { LevelMapper } from "./LevelMapper";
import { ChoiceFormSchema } from "features/ChoiceCrud/ChoiceForm/ChoiceFormSchema";
import { CriterionMapper } from "./CriterionMapper";
import { ContentType } from "library/common/enums";
import * as dto from "../dto/choice-dto";

export class ChoiceMapper
  implements Mapper<Choice, dto.GetChoice, dto.CreateChoice, ChoiceFormSchema>
{
  formSchemaToAPI(schema: ChoiceFormSchema): dto.CreateChoice {
    const evidenceList = schema.requiredEvidences || [];
    const requiredEvidences = evidenceList.map((evidence) => ({
      id: evidence.id,
      title: evidence.title,
      contentType: evidence.contentType.join(","),
    }));

    return {
      levelId: schema.levelId,
      criterionId: schema.criterionId,
      responseDecription: schema.details,
      isEvidenceRequired: schema.isEvidenceRequired,
      requiredEvidencesRequests: requiredEvidences,
    };
  }

  modelToFormSchema(model: Choice): ChoiceFormSchema {
    return {
      levelId: model.level.id,
      criterionId: model.criterion.id,
      details: model.details,
      isEvidenceRequired: model.isEvidenceRequired,
      requiredEvidences: model.requiredEvidences,
    };
  }

  fromAPI(data: dto.GetChoice): Choice {
    const levelMapper = new LevelMapper();
    const criterionMapper = new CriterionMapper();
    const requiredEvidences = data.requiredEvidencesResponses || [];

    return {
      id: data.responsesId,
      details: data.responseDecription,
      level: levelMapper.fromAPI(data.levelsResponse),
      criterion: criterionMapper.fromAPI(data.criterionResponse),
      isEvidenceRequired: data.isEvidenceRequired,
      requiredEvidences: requiredEvidences.map((evidence) => ({
        id: evidence.id,
        title: evidence.title,
        contentType: evidence.contentType.split(",") as ContentType[],
      })),
    };
  }
}
