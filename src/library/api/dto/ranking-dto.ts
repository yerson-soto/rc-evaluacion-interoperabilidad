import { GetUser } from './user-dto';
import { GetOrganizationNested } from './organization-dto';

export interface GetRanking {
  institutionalResponses: GetOrganizationNested
  finalScore: number;
}

export interface GetRankingParams {
  search?: string;
  typeOrder?: 'asc' | 'desc';
  orderBy?: 'Organismo' | 'FinalScore';
}

export interface GetPaginatedRanking {
  elementostotales: number;
  page: number;
  rows: number;
  paginastotales: number;
  evaluationsInstitutionalResponse: GetRanking[];
}