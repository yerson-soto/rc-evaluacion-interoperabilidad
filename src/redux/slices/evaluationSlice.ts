import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { Pagination } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { Evaluation } from "library/models/Evaluation";
import { createCrudSlice } from "redux/actions/sliceCreator";
import { CrudState } from "library/common/interfaces";
import { FilterValues } from 'library/common/interfaces';
import { createPaginationReducers } from '../reducers/paginationReducers';
import { PaginationCaseReducers } from 'redux/reducers/paginationReducers';

export interface EvaluationState extends CrudState<Evaluation> {
  total: number;
  page: number;
  pageSize: number;
  filter: FilterValues<Evaluation>;
}

const reducers = createPaginationReducers<Evaluation, EvaluationState>();

const initialState: EvaluationState = {
  results: [],
  total: 0,
  page: 1,
  pageSize: 10,
  filter: {
    sortType: 'desc',
    sortBy: 'dateCreated',
    search: '',
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
