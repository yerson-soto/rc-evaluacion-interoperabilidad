import { Mapper } from "library/common/interfaces";
import { Evaluation } from "library/models/Evaluation";
import { GetEvaluation, CreateEvaluation } from "library/api/dto/evaluation-dto";
import { EvaluationFormSchema } from "features/EvaluationCrud/EvaluationForm/EvaluationFormSchema";
import { OrganizationMapper } from './OrganizationMapper';

export class EvaluationMapper
  implements Mapper<Evaluation, GetEvaluation, CreateEvaluation, EvaluationFormSchema>
{

  formSchemaToAPI(schema: EvaluationFormSchema): CreateEvaluation {
    return {
      organismoId: schema.organizationId
    };
  }

  fromAPI(data: GetEvaluation): Evaluation {
    const orgMapper = new OrganizationMapper();
    const organization = orgMapper.fromAPINested(data.organismo);
    
    return {
      uid: data.id,
      organization,
      dateCreated: data.dateInitial,
      score: 0,
    };
  }
}
