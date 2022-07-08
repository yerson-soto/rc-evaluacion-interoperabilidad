import { Location } from "react-router-dom";

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

export interface LocationState<T> extends Location {
  state: T;
}

export interface Mapper<Model, APIReceivedData, APISentData, FormSchema> {
  formSchemaToAPI: (schema: FormSchema) => APISentData;
  fromAPI: (data: APIReceivedData) => Model;
}