export interface Response<T> {
  result: T;
  message: string;
  isSuccess: boolean;
}