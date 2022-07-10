import { createSlice, Draft, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { CrudState } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { CrudCaseReducers } from 'library/common/interfaces';

export interface CrudSlice<T, State extends CrudState<T>> {
  name: string;
  initialState: State;
  keySource: keyof T;
  extend?: SliceCaseReducers<State>;
}

export function createCrudSlice<T, State extends CrudState<T>>({
  name,
  initialState,
  keySource,
  extend = {},
}: CrudSlice<T, State>) {
  return createSlice<State, CrudCaseReducers<T, State>>({
    name,
    initialState,
    reducers: {
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
      },
      getSuccess: (state, action: PayloadAction<State["results"]>) => {
        state.results = action.payload as Draft<T>[];
        state.isLoading = false;
        state.hasError = false;
        state.errorMessage = "";
      },
      getFailed: (state, action: PayloadAction<ErrorMessage>) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      },

      createSuccess: (state, action: PayloadAction<T>) => {
        state.results.unshift(action.payload as Draft<T>);
        state.isLoading = false;
        state.hasError = false;
        state.errorMessage = "";
      },
      createFailed: (state, action: PayloadAction<ErrorMessage>) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      },
      editSuccess: (state, action: PayloadAction<T>) => {
        const itemIndex = state.results.findIndex((result: any) => {
            return result[keySource] === action.payload[keySource];
          }),
          itemExists = itemIndex !== -1;

        if (itemExists)
          state.results.splice(itemIndex, 1, action.payload as Draft<T>);

        state.isLoading = false;
        state.hasError = false;
        state.errorMessage = "";
      },
      editFailed: (state, action: PayloadAction<ErrorMessage>) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      },

      deleteSuccess: (state, action: PayloadAction<T>) => {
        const itemIndex = state.results.findIndex(
            (result: any) => result[keySource] === action.payload
          ),
          itemExists = itemIndex !== -1;

        if (itemExists) state.results.splice(itemIndex, 1);

        state.isLoading = false;
        state.hasError = false;
        state.errorMessage = "";
      },

      // deleteSuccess: (state, action: PayloadAction<T[typeof keySource]>) => {
      //   const itemIndex = state.results.findIndex(
      //       (result: any) => result[keySource] === action.payload
      //     ),
      //     itemExists = itemIndex !== -1;

      //   if (itemExists) state.results.splice(itemIndex, 1);

      //   state.isLoading = false;
      //   state.hasError = false;
      //   state.errorMessage = "";
      // },
      deleteFailed: (state, action: PayloadAction<ErrorMessage>) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      },
      ...extend,
    },
  });
}
