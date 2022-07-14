import { Lineament } from "library/models/Lineament";
import { GetLineament, CreateLineament } from "library/api/dto/lineament-dto";
import { AbstractCrudService } from "./AbstractCrudService";
import { LineamentMapper } from "library/api/mappers/LineamentMapper";
import { LineamentFormSchema } from "features/LineamentCrud/LineamentForm/LineamentFormSchema";

export class LineamentService extends AbstractCrudService<
  Lineament,
  GetLineament,
  CreateLineament,
  LineamentFormSchema
> {
  mapper: LineamentMapper;
  getAllUrl: string;
  createUrl: string;

  constructor() {
    super();
    this.mapper = new LineamentMapper();
    this.getAllUrl = "/lineament";
    this.createUrl = "/lineament";
  }
  
  getDetailUrl(id: number): string {
    return "/lineament/" + id.toString();
  };
}
