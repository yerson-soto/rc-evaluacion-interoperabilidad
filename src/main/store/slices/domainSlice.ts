import {
  createSlice,
  Draft,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { CommonState } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { Domain } from "library/models/Domain";

interface CrudState<T> extends CommonState {
  results: T[];
}

interface DomainState extends CrudState<Domain> {}

// type SliceCaseReducers<State> = {
//   [K: string]: CaseReducer<State, {
//       payload: any;
//       type: string;
//   }> | CaseReducerWithPrepare<State, PayloadAction<any, string, any, any>>;



const initialState: DomainState = {
  results: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};
/* 
TODO: 
  1. Annotate each crud action
  2. Allow add new actions
*/ 
interface CrudActions<T, State extends CrudState<T>> {
  setLoading: (state: Draft<State>, action: PayloadAction<boolean>) => void,
  getSuccess: (state: Draft<State>, action: PayloadAction<State["results"]>) => void,
  getFailed: (state: Draft<State>, action: PayloadAction<ErrorMessage>) => void,
  createSuccess: (state: Draft<State>, action: PayloadAction<T>) => void,
  createFailed: (state: Draft<State>, action: PayloadAction<ErrorMessage>) => void,
  editSuccess: (state: Draft<State>, action: PayloadAction<T>) => void,
  editFailed: (state: Draft<State>, action: PayloadAction<ErrorMessage>) => void,
  // deleteSuccess: (state: Draft<State>, action: PayloadAction<T[typeof keySource]>) => void,
  // deleteFailed: (state: Draft<State>, action: PayloadAction<ErrorMessage>) => void,
}

interface CrudReducer<T, State extends CrudState<T>> {
  name: string;
  initialState: State;
  keySource: keyof T;
  extend?: SliceCaseReducers<State>;
}

function createCrudReducer<T, State extends CrudState<T>>({
  name,
  initialState,
  keySource,
  extend = {},
}: CrudReducer<T, State>) {
  return createSlice({
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

      deleteSuccess: (state, action: PayloadAction<T[typeof keySource]>) => {
        const itemIndex = state.results.findIndex(
            (result: any) => result[keySource] === action.payload
          ),
          itemExists = itemIndex !== -1;

        if (itemExists) state.results.splice(itemIndex, 1);

        state.isLoading = false;
        state.hasError = false;
        state.errorMessage = "";
      },
      deleteFailed: (state, action: PayloadAction<ErrorMessage>) => {
        state.isLoading = false;
        state.hasError = true;
        state.errorMessage = action.payload;
      },
      ...extend,
    },
  });
}

const domainSlice = createCrudReducer<Domain, DomainState>({
  name: "domains",
  initialState,
  keySource: "id",
});

export const { ...actions } = domainSlice.actions;
export default domainSlice;
