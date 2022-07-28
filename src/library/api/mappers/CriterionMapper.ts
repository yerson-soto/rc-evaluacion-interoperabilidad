import { Mapper } from "library/common/interfaces";
import { FullCriterion, Criterion } from "library/models/Criterion";
import { CriterionFormSchema } from "features/CriterionCrud/CriterionForm/CriterionFormSchema";
import { GetCriterion, CreateCriterion } from "../dto/criterion-dto";
import { LineamentMapper } from "./LineamentMapper";
import { ChoiceMapper } from "./ChoiceMapper";
import { DefaultOptionType } from "antd/lib/select";

export class CriterionMapper
  implements
    Mapper<Criterion, GetCriterion, CreateCriterion, CriterionFormSchema>
{
  formSchemaToAPI(schema: CriterionFormSchema): CreateCriterion {
    return {
      description: schema.name,
      lineamentsId: schema.lineaments,
    };
  }

  fromAPI(data: GetCriterion): Criterion {
    const lineamentMapper = new LineamentMapper();

    return {
      id: data.id,
      name: data.description,
      lineaments: data.lineamentsResponses.map(
        lineamentMapper.fromAPILighweight
      ),
    };
  }

  fromAPIFull(data: GetCriterion): FullCriterion {
    const lineamentMapper = new LineamentMapper();
    const choiceMapper = new ChoiceMapper();

    return {
      id: data.id,
      name: data.description,
      categories: data.lineamentsResponses.map(lineamentMapper.fromAPILighweight),
      choices: data.responseResponses.map((response) => choiceMapper.fromAPI(response)),
    };
  }

  toSelectOption(criterion: Criterion): DefaultOptionType {
    return {
      label: criterion.name,
      value: criterion.id,
    };
  }
}
