import { GetUser } from './user-dto';
import { GetOrganizationNested } from './organization-dto';

export interface GetEvaluation {
  id: string;
  dateInitial: string;
  dateProcess: null | string;
  dateFinally: null | string;
  userResponse: GetUser,
  organismo: GetOrganizationNested;
  sequecenEvaluation: string;
  resultLevelResponse: {
    id: number;
    resultFinallly: number;
    evaluationInstitutionalId: string;
  };
  statesResponse: {
    id: number;
    description: string;
  },
}

export interface CreateEvaluation {
  organismoId: number;
  userId: string;
  userTechnicsId: string;
  dateDiary: string;
}

export interface GetEvaluationParams {
  search?: string;
  typeOrder?: 'asc' | 'desc';
  orderBy?: 'Date' | 'Organismo' | 'CurrentLevel';
}

export interface GetPaginatedEvaluation {
  elementostotales: number;
  page: number;
  rows: number;
  paginastotales: number;
  evaluations: GetEvaluation[];
}
