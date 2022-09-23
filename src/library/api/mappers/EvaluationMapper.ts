import { FilterValues, Mapper, Pagination } from "library/common/interfaces";
import { Evaluation } from "library/models/Evaluation";
import { GetEvaluation, CreateEvaluation, GetEvaluationParams } from "library/api/dto/evaluation-dto";
import { EvaluationFormSchema } from "features/EvaluationList/EvaluationForm/EvaluationFormSchema";
import { OrganizationMapper } from './OrganizationMapper';
import { GetPaginatedEvaluation, GetCalendar } from '../dto/evaluation-dto';
import { UserMapper } from "./UserMapper";
import { getScoreColor } from 'library/helpers/score-color';
import { EvaluationStatus } from 'library/common/enums';

export class EvaluationMapper
  implements Mapper<Evaluation, GetEvaluation, CreateEvaluation, EvaluationFormSchema>
{

  formSchemaToAPI(schema: EvaluationFormSchema): CreateEvaluation {
    return {
      organismoId: schema.organizationId,
      userId: schema.userId,
      userTechnicsId: schema.supportId,
      dateDiary: schema.startDate
    };
  }

  fromAPI(data: GetEvaluation): Evaluation {
    const orgMapper = new OrganizationMapper();
    const userMapper = new UserMapper();
    
    const organization = orgMapper.fromAPINested(data.organismo),
      manager = userMapper.fromAPI(data.userResponse),
      score = Number(data.resultLevelResponse.resultFinallly.toFixed(2)) || 0,
      scorePercent = score * 100 / 5;

    return {
      uid: data.id,
      nomenclature: data.sequecenEvaluation,
      dateCreated: data.dateInitial,
      dateEnd: data.dateFinally,
      datePending: data.dateProcess,
      status: data.statesResponse.id,
      indicatorColor: getScoreColor(score),
      scorePercent,
      score,
      organization,
      manager
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

  fromFilterToQueryParams(
    filter: FilterValues<Evaluation, EvaluationStatus>
  ): GetEvaluationParams {
    const fields: Record<string, GetEvaluationParams['orderBy']> = {
      organization: 'Organismo',
      dateCreated: 'Date',
      score: 'CurrentLevel'
    }

    return {
      search: filter.search,
      typeOrder: filter.sortType,
      orderBy: filter.sortBy && fields[filter.sortBy],
      statesId: filter.status?.join(',')
    };
  }
}
