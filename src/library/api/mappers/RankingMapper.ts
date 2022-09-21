import { FilterValues, Pagination } from "library/common/interfaces";
import { OrganizationMapper } from './OrganizationMapper';
import { GetPaginatedRanking, GetRanking, GetRankingParams } from '../dto/ranking-dto';
import { Ranking } from "library/models/Ranking";


export class RankingMapper {

  fromAPI(data: GetRanking): Ranking {
    const organizationMapper = new OrganizationMapper();
    const institution = organizationMapper.fromAPINested(data.institutionalResponses);

    return {
      institution,
      score:  Number(data.finalScore.toFixed(2)) || 0,
      timesEvaluated: data.amountEvaluation
    };
  }

  fromAPIPaginated(data: GetPaginatedRanking): Pagination<Ranking> {
    const evaluations = data.evaluationsInstitutionalResponse.map(this.fromAPI);
    
    return {
      total: data.elementostotales,
      totalPages: data.paginastotales,
      pageSize: data.rows,
      page: data.page,
      results: evaluations
    }
  }

  fromFilterToQueryParams(filter: FilterValues<Ranking>): GetRankingParams {
    const fields: Record<string, GetRankingParams['orderBy']> = {
      institution: 'Organismo',
      score: 'FinalScore',
    }

    return {
      search: filter.search,
      typeOrder: filter.sortType,
      orderBy: filter.sortBy && fields[filter.sortBy]
    };
  }
}
