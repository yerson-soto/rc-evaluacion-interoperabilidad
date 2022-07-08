export interface GetEvaluation {
  id: string;
  dateInitial: string;
  organismo: {
    id: number;
    orgasnimo: string;
    siglas: string;
  };
  currentLevel: number;
}

export interface GetPaginatedEvaluation {
  elementostotales: number;
  page: number;
  rows: number;
  paginastotales: number;
  evaluations: GetEvaluation[];
}