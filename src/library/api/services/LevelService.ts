import { Level } from "library/models/Level";
import { GetLevel, CreateLevel } from "library/api/dto/level-dto";
import { AbstractCrudService } from "./AbstractCrudService";
import { LevelMapper } from "library/api/mappers/LevelMapper";
import { LevelFormSchema } from "features/LevelCrud/LevelForm/LevelFormSchema";

export class LevelService extends AbstractCrudService<
  Level,
  GetLevel,
  CreateLevel,
  LevelFormSchema
> {
  mapper: LevelMapper;
  getAllUrl: string;
  createUrl: string;

  constructor() {
    super();
    this.mapper = new LevelMapper();
    this.getAllUrl = "/levels";
    this.createUrl = "/levels";
  }
  
  getDetailUrl(id: number): string {
    return "/levels/" + id.toString();
  };
}
