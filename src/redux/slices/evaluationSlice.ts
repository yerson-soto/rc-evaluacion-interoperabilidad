import { CaseReducer, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { Pagination } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { Evaluation } from "library/models/Evaluation";
import { createCrudSlice } from "redux/actions/sliceCreator";
import { CrudState } from "library/common/interfaces";

export interface EvaluationState extends CrudState<Evaluation> {
  total: number;
  page: number;
  pageSize: number;
}

const initialState: EvaluationState = {
  results: [],
  total: 0,
  page: 1,
  pageSize: 10,
  hasError: false,
  isLoading: false,
  errorMessage: "",
};

export interface EvaluationReducers extends SliceCaseReducers<EvaluationState> {
  getPageSuccess: CaseReducer<EvaluationState, PayloadAction<Pagination<Evaluation>>>;
  getPageFailed: CaseReducer<EvaluationState, PayloadAction<ErrorMessage>>;
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
    getPageSuccess: (state, action: PayloadAction<Pagination<Evaluation>>) => {
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.total = action.payload.total;
      
      state.results = action.payload.results;
      state.isLoading = false;
    },
    getPageFailed: (state, action: PayloadAction<ErrorMessage>) => {
      state.results = [];
      state.page = 0;
      state.total = 0;

      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const actions = evaluationSlice.actions;
