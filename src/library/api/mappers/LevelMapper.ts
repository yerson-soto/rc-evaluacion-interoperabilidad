import { Mapper } from "library/common/interfaces";
import { Level } from "library/models/Level";
import { GetLevel, CreateLevel } from "../dto/level-dto";

// Pending to add FormSchema Type
export class LevelMapper implements Mapper<Level, GetLevel, CreateLevel, any> {
  formSchemaToAPI(schema: any): CreateLevel {
    return {
      level: schema,
      description: schema,
      levelDescription: schema,
      levelValue: schema,
    };
  }

  fromAPI(data: GetLevel): Level {
    return {
      id: data.levelsId,
      name: data.description,
      value: data.levelValue,
    };
  }
}
