import { URLPath } from "./types";

export interface Response<T> {
  result: T;
  message: string;
  isSuccess: boolean;
}

export interface CommonState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export interface LocationState {
  from: URLPath;
}
