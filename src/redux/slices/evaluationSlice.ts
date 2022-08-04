import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { Pagination } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { Evaluation } from "library/models/Evaluation";
import { createCrudSlice } from "redux/actions/sliceCreator";
import { CrudState } from "library/common/interfaces";
import { FilterValues } from 'library/common/interfaces';

export interface EvaluationState extends CrudState<Evaluation> {
  total: number;
  page: number;
  pageSize: number;
  filter: FilterValues<Evaluation>;
}

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

export interface EvaluationReducers extends SliceCaseReducers<EvaluationState> {
  filterSuccess: CaseReducer<EvaluationState, PayloadAction<Pagination<Evaluation>>>;
  filterFailed: CaseReducer<EvaluationState, PayloadAction<ErrorMessage>>;
  filterChanged: CaseReducer<EvaluationState, PayloadAction<FilterValues<Evaluation>>>;
  pageChanged: CaseReducer<EvaluationState, PayloadAction<number>>;
}

export const evaluationSlice = createCrudSlice<
  Evaluation,
  EvaluationState,
  "evaluations",
  EvaluationReducers
>({
  name: "evaluations",
  idSource: "uid",
  initialState,
  extend: {
    filterSuccess: (state, action: PayloadAction<Pagination<Evaluation>>) => {
      state.total = action.payload.total;
      state.results = action.payload.results;
      state.isLoading = false;
    },
    filterFailed: (state, action: PayloadAction<ErrorMessage>) => {
      state.results = [];
      state.total = 0;
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload;
    },
    filterChanged: (state, action: PayloadAction<FilterValues<Evaluation>>) => {
      state.filter = action.payload;
    },
    pageChanged: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const actions = evaluationSlice.actions;
