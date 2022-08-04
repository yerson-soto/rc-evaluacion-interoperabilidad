import { FilterValues, Mapper, Pagination } from "library/common/interfaces";
import { Evaluation } from "library/models/Evaluation";
import { GetEvaluation, CreateEvaluation, GetEvaluationParams } from "library/api/dto/evaluation-dto";
import { EvaluationFormSchema } from "features/EvaluationCrud/EvaluationForm/EvaluationFormSchema";
import { OrganizationMapper } from './OrganizationMapper';
import { GetPaginatedEvaluation } from '../dto/evaluation-dto';
import { UserMapper } from "./UserMapper";

export class EvaluationMapper
  implements Mapper<Evaluation, GetEvaluation, CreateEvaluation, EvaluationFormSchema>
{

  formSchemaToAPI(schema: EvaluationFormSchema): CreateEvaluation {
    return {
      organismoId: schema.organizationId,
      userId: schema.userId
    };
  }

  fromAPI(data: GetEvaluation): Evaluation {
    const orgMapper = new OrganizationMapper();
    const userMapper = new UserMapper();

    const organization = orgMapper.fromAPINested(data.organismo),
      user = userMapper.fromAPI(data.userResponse),
      score = Number(data.resultLevelResponse.resultFinallly.toFixed(2));

    return {
      uid: data.id,
      dateCreated: data.dateInitial,
      organization,
      user,
      score
    };
  }

  fromAPIPaginated(data: GetPaginatedEvaluation): Pagination<Evaluation> {
    const evaluations = data.evaluations.map(this.fromAPI);
    
    return {
      total: data.elementostotales,
      totalPages: data.paginastotales,
      pageSize: data.rows,
      page: data.page,
      results: evaluations
    }
  }

  fromFilterToQueryParams(filter: FilterValues<Evaluation>): GetEvaluationParams {
    const fields: Record<string, GetEvaluationParams['orderBy']> = {
      organization: 'Organismo',
      dateCreated: 'Date',
      score: 'CurrentLevel'
    }

    return {
      search: filter.search,
      typeOrder: filter.sortType,
      orderBy: filter.sortBy && fields[filter.sortBy]
    };
  }
}
