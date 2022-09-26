import { CaseReducer, PayloadAction, Slice, SliceCaseReducers } from "@reduxjs/toolkit";
import { FilterValues, Pagination, PaginationState } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";

export interface PaginationReducer<T, State extends PaginationState<T>>
  extends Slice<State, PaginationCaseReducers<T, State>> {}

export interface PaginationCaseReducers<T, State extends PaginationState<T>>
  extends SliceCaseReducers<State> {
  startFiltering: CaseReducer<State>;
  filterSuccess: CaseReducer<State, PayloadAction<Pagination<T>>>;
  filterFailed: CaseReducer<State, PayloadAction<ErrorMessage>>;
  filterChanged: CaseReducer<State, PayloadAction<FilterValues<T>>>;
  pageChanged: CaseReducer<State, PayloadAction<number>>;
}

export function createPaginationReducers<
  T,
  State extends PaginationState<T>
>() {
  return {
    startFiltering: (state: State) => {
      state.isLoading = true;
    },
    filterSuccess: (state: State, action: PayloadAction<Pagination<T>>) => {
      state.total = action.payload.total;
      state.results = action.payload.results;
      state.isLoading = false;
    },
    filterFailed: (state: State, action: PayloadAction<ErrorMessage>) => {
      state.results = [];
      state.total = 0;
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload;
    },
    filterChanged: (state: State, action: PayloadAction<FilterValues<T>>) => {
      state.filter = action.payload;
    },
    pageChanged: (state: State, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  };
}
