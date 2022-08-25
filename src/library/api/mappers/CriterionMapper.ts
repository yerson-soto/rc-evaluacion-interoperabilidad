import { Mapper } from "library/common/interfaces";
import { FullCriterion, Criterion } from "library/models/Criterion";
import { CriterionFormSchema } from "features/CriterionCrud/CriterionForm/CriterionFormSchema";
import { GetCriterion, CreateCriterion } from "../dto/criterion-dto";
import { LineamentMapper } from "./LineamentMapper";
import { ChoiceMapper } from "./ChoiceMapper";
import { DefaultOptionType } from "antd/lib/select";
import { DomainMapper } from './DomainMapper';
import { Domain } from '../../models/Domain';

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
    const lineaments = data.lineamentsResponses 
      ? data.lineamentsResponses?.map(lineamentMapper.fromAPILighweight)
      : [];
      
    return {
      id: data.id,
      name: data.description,
      lineaments
    };
  }

  fromAPIFull(data: GetCriterion): FullCriterion {
    const lineamentMapper = new LineamentMapper();
    const choiceMapper = new ChoiceMapper();
    const domainMapper = new DomainMapper();

    return {
      id: data.id,
      name: data.description,
      domain: data.domainResponse ? domainMapper.fromAPI(data.domainResponse) : {} as Domain,
      lineaments: data.lineamentsResponses.map(lineamentMapper.fromAPILighweight),
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
