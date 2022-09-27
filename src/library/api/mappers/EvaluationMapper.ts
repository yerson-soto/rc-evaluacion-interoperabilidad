import { FilterValues, Mapper, Pagination } from "library/common/interfaces";
import { Evaluation } from "library/models/Evaluation";
import { EvaluationFormSchema } from "features/EvaluationList/EvaluationForm/EvaluationFormSchema";
import { OrganizationMapper } from './OrganizationMapper';
import { UserMapper } from "./UserMapper";
import { getScoreColor } from 'library/helpers/score-color';
import { EvaluationStatus } from 'library/common/enums';
import { evaluationStatus, evStatusLabels } from 'library/common/constants';
import * as dto from "library/api/dto/evaluation-dto";

export class EvaluationMapper
  implements Mapper<Evaluation, dto.GetEvaluation, dto.CreateEvaluation, EvaluationFormSchema>
{

  formSchemaToAPI(schema: EvaluationFormSchema): dto.CreateEvaluation {
    return {
      organismoId: schema.organizationId,
      userId: schema.userId,
      userTechnicsId: schema.supportId,
      dateDiary: schema.startDate?.format() || ''
    };
  }

  fromAPI(data: dto.GetEvaluation): Evaluation {
    const orgMapper = new OrganizationMapper(),
      userMapper = new UserMapper(),
      result = data.resultLevelResponse ? data.resultLevelResponse.resultFinallly : 0,
      status: EvaluationStatus = data.statesResponse.id;
    
    const organization = orgMapper.fromAPINested(data.organismo),
      manager = userMapper.fromAPI(data.userResponse),
      score = Number(result.toFixed(2)) || 0,
      scorePercent = score * 100 / 5;

    return {
      uid: data.id,
      nomenclature: data.sequecenEvaluation,
      dateStart: data.dateInitial,
      datePending: data.dateProcess,
      dateEnd: data.dateFinally,
      status,
      statusVerbose: evaluationStatus[status],
      statusLabel: evStatusLabels[status],
      indicatorColor: getScoreColor(score),
      scorePercent,
      score,
      organization,
      manager
    };
  }

  fromAPIPaginated(data: dto.GetPaginatedEvaluation): Pagination<Evaluation> {
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
  ): dto.GetEvaluationParams {
    const fields: Record<string, dto.GetEvaluationParams['orderBy']> = {
      organization: 'Organismo',
      dateStart: 'Date',
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
