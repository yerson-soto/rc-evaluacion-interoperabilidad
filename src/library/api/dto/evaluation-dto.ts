import { GetUser } from './user-dto';
import { GetOrganizationNested } from './organization-dto';

export interface GetEvaluation {
  id: string;
  dateInitial: string;
  userResponse: GetUser,
  organismo: GetOrganizationNested;
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