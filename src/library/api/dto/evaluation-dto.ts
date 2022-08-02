export interface GetEvaluation {
  id: string;
  dateInitial: string;
  currentLevel: number;

  // dateSend: null;
  // dateEnd: null;
  // states: null;
  // isActive: true;
  // user: null;
  
  organismo: {
    id: number;
    orgasnimo: string;
    siglas: string;
  };
  resultLevel: {
    id: string;
    resultFinallly: string;
    evaluationInstitutionalId: string;
  };
}

export interface CreateEvaluation {
  organismoId: number;
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