import { Evaluation } from "library/models/Evaluation";
import { createCrudSlice } from "redux/sliceCreator";
import { CrudState } from "library/common/interfaces";
import { FilterValues } from 'library/common/interfaces';
import { createPaginationReducers } from '../reducers/paginationReducers';
import { PaginationCaseReducers } from 'redux/reducers/paginationReducers';
import { EvaluationStatus } from 'library/common/enums';

export interface EvaluationState extends CrudState<Evaluation> {
  total: number;
  page: number;
  pageSize: number;
  filter: FilterValues<Evaluation, EvaluationStatus>;
}

const reducers = createPaginationReducers<Evaluation, EvaluationState>();

const initialState: EvaluationState = {
  results: [],
  total: 0,
  page: 1,
  pageSize: 10,
  filter: {
    sortType: 'desc',
    sortBy: 'dateStart',
    search: '',
    status: [
      EvaluationStatus.Scheduled, 
      EvaluationStatus.Started, 
      EvaluationStatus.Pending, 
      EvaluationStatus.Completed
    ]
  },
  hasError: false,
  isLoading: false,
  errorMessage: "",
};

export const evaluationSlice = createCrudSlice<
  Evaluation,
  EvaluationState,
  "evaluations",
  PaginationCaseReducers<Evaluation, EvaluationState>
>({
  name: "evaluations",
  idSource: "uid",
  initialState,
  extend: { ...reducers },
});

export const actions = evaluationSlice.actions;
