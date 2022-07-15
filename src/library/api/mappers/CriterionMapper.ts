import { Mapper } from "library/common/interfaces";
import { FullCriterion, Criterion } from "library/models/Criterion";
import { CriterionFormSchema } from "features/CriterionCrud/CriterionForm/CriterionFormSchema";
import { GetCriterion, CreateCriterion } from "../dto/criterion-dto";
import { LineamentMapper } from "./LineamentMapper";
import { ChoiceMapper } from "./ChoiceMapper";

export class CriterionMapper
  implements
    Mapper<Criterion, GetCriterion, CreateCriterion, CriterionFormSchema>
{
  formSchemaToAPI(schema: CriterionFormSchema): CreateCriterion {
    return {
      name: schema.name,
      lineaments: schema.lineaments,
    };
  }

  fromAPI(data: GetCriterion): Criterion {
    const lineamentMapper = new LineamentMapper();

    return {
      id: data.id,
      name: data.description,
      lineaments: data.lineaments.map(lineamentMapper.fromAPI),
    };
  }

  fromAPIFull(data: GetCriterion): FullCriterion {
    const lineamentMapper = new LineamentMapper();
    const choiceMapper = new ChoiceMapper();
    
    return {
      id: data.id,
      name: data.description,
      categories: data.lineaments.map(lineamentMapper.fromAPILighweight),
      choices: data.responses.map((response) => choiceMapper.fromAPI(response))
    };
  }
}
