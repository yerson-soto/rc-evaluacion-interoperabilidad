import { Mapper } from "library/common/interfaces";
import { Choice } from "library/models/Choice";
import { GetChoice, CreateChoice } from "../dto/choice-dto";
import { LevelMapper } from './LevelMapper';
import { ChoiceFormSchema } from "features/ChoiceCrud/ChoiceForm/ChoiceFormSchema";
import { CriterionMapper } from './CriterionMapper';


export class ChoiceMapper
  implements Mapper<Choice, GetChoice, CreateChoice, ChoiceFormSchema>
{
  formSchemaToAPI(schema: ChoiceFormSchema): CreateChoice {
    return {
      levelId: schema.levelId,
      criterionId: schema.criterionId,
      responseDecription: schema.details
    };
  }

  fromAPI(data: GetChoice): Choice {
    const levelMapper = new LevelMapper();
    const criterionMapper = new CriterionMapper();

    return {
      id: data.responsesId,
      details: data.responseDecription,
      level: levelMapper.fromAPI(data.levelsResponse),
      criterion: criterionMapper.fromAPI(data.criterion)
    };
  }
}
