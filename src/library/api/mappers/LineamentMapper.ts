import { Mapper } from "library/common/interfaces";
import { Lineament } from "library/models/Lineament";
import { LineamentFormSchema } from "features/LineamentCrud/LineamentForm/LineamentFormSchema";
import { GetLineament, CreateLineament } from "../dto/lineament-dto";
import { DomainMapper } from "./DomainMapper";
import { Domain } from "library/models/Domain";

export class LineamentMapper
  implements
    Mapper<Lineament, GetLineament, CreateLineament, LineamentFormSchema>
{
  formSchemaToAPI(schema: LineamentFormSchema): CreateLineament {
    return {
      domainId: schema.domainId,
      description: schema.nomenclature,
      definictionLineament: schema.description,
    };
  }

  fromAPI(data: GetLineament): Lineament {
    const domainMapper = new DomainMapper();
    
    return {
      id: data.id,
      nomenclature: data.description,
      description: data.definictionLineament,
      domain: data.domain 
        ? domainMapper.fromAPI(data.domain) 
        : {} as Domain
    };
  }
}
