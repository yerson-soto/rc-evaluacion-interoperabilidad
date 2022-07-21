import { CaseReducer, PayloadAction, Slice, SliceCaseReducers } from "@reduxjs/toolkit";
import { Location } from "react-router-dom";
import { ErrorMessage, ID } from './types';

export interface APIResponse<T> {
  result: T;
  message: string;
  isSuccess: boolean;
}

export interface CommonState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export interface CrudState<T> extends CommonState {
  results: T[];
}

export interface CrudCaseReducers<T, State extends CrudState<T>> extends SliceCaseReducers<State> {
  setLoading: CaseReducer<State, PayloadAction<boolean>>;
  getSuccess: CaseReducer<State, PayloadAction<T[]>>;
  getFailed: CaseReducer<State, PayloadAction<ErrorMessage>>;
  createSuccess: CaseReducer<State, PayloadAction<T>>;
  createFailed: CaseReducer<State, PayloadAction<ErrorMessage>>;
  editSuccess: CaseReducer<State, PayloadAction<T>>;
  editFailed: CaseReducer<State, PayloadAction<ErrorMessage>>;
  deleteSuccess: CaseReducer<State, PayloadAction<ID>>;
  deleteFailed: CaseReducer<State, PayloadAction<ErrorMessage>>;
}

export interface CrudReducer<T> extends Slice<CrudState<T>, CrudCaseReducers<T, CrudState<T>>> {};

export interface LocationState<T> extends Location {
  state: T;
}

export interface Mapper<Model, APIReceivedData, APISentData, FormSchema> {
  formSchemaToAPI: (schema: FormSchema) => APISentData;
  fromAPI: (data: APIReceivedData) => Model;
}
