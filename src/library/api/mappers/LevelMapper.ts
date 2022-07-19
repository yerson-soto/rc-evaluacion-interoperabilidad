import { Mapper } from "library/common/interfaces";
import { Level } from "library/models/Level";
import { GetLevel, CreateLevel } from "../dto/level-dto";
import { LevelFormSchema } from "features/LevelCrud/LevelForm/LevelFormSchema";

export class LevelMapper
  implements Mapper<Level, GetLevel, CreateLevel, LevelFormSchema>
{
  formSchemaToAPI(schema: LevelFormSchema): CreateLevel {
    return {
      description: schema.name,
      levelDescription: schema.description,
    };
  }

  fromAPI(data: GetLevel): Level {
    return {
      id: data.levelsId,
      name: data.description,
      description: data.levelDescription,
      value: data.levelValue,
    };
  }
}
