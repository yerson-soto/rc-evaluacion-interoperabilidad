import { Mapper } from "library/common/interfaces";
import { LightLineament, Lineament } from "library/models/Lineament";
import { LineamentFormSchema } from "features/LineamentCrud/LineamentForm/LineamentFormSchema";
import { GetLineament, CreateLineament } from "../dto/lineament-dto";
import { DomainMapper } from "./DomainMapper";

export class LineamentMapper
  implements
    Mapper<Lineament, GetLineament, CreateLineament, LineamentFormSchema>
{
  formSchemaToAPI(schema: LineamentFormSchema): CreateLineament {
    return {
      domainId: schema.domainId,
      definictionLineament: schema.description,
    };
  }

  fromAPI(data: GetLineament): Lineament {
    const domainMapper = new DomainMapper();
    
    return {
      id: data.id,
      nomenclature: data.description,
      description: data.definictionLineament,
      domain: domainMapper.fromAPI(data.domain)
    };
  }

  fromAPILighweight(data: GetLineament): LightLineament {
    return {
      id: data.id,
      nomenclature: data.description,
      description: data.definictionLineament
    };
  }
}
