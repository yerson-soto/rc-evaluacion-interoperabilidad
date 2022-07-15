import { Mapper } from "library/common/interfaces";
import { Choice } from "library/models/Choice";
import { GetChoice, CreateChoice } from "../dto/choice-dto";
import { LevelMapper } from './LevelMapper';

// TODO: Pending add form schema
export class ChoiceMapper
  implements Mapper<Choice, GetChoice, CreateChoice, any>
{
  formSchemaToAPI(schema: any): CreateChoice {
    return {
      levelId: schema.name,
      description: schema.description,
    };
  }

  fromAPI(data: GetChoice): Choice {
    const levelMapper = new LevelMapper();

    return {
      id: data.responsesId,
      details: data.responseDecription,
      level: levelMapper.fromAPI(data.levelsResponse),
    };
  }
}
