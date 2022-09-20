import { Ranking } from "library/models/Ranking";
import { APIResponse, FilterValues, Pagination } from "library/common/interfaces";
import { AbstractAPIService } from "./AbstractApiService";
import { RankingMapper } from "library/api/mappers/RankingMapper";
import { GetPaginatedRanking } from "library/api/dto/ranking-dto";

export interface RankingRepository {
  filter: (page: number, values: FilterValues<Ranking>) => Promise<Pagination<Ranking>>
}

export class RankingService extends AbstractAPIService implements RankingRepository {
  mapper: RankingMapper;

  constructor() {
    super();
    this.mapper = new RankingMapper();
  }
  
  filter(page: number, values: FilterValues<Ranking>): Promise<Pagination<Ranking>> {
    return new Promise((resolve, reject) => {
      const url = `evaluationInstitutional/resultFinally/${page}/10`;
      const params = this.mapper.fromFilterToQueryParams(values);
      
      this.client
        .get<APIResponse<GetPaginatedRanking>>(url, { params })
        .then((res) => {
          const pagination = this.mapper.fromAPIPaginated(res.data.result);
          resolve(pagination);
        })
        .catch(() => reject("No se pudo cargar las evaluaciones"));
    });
  }
}