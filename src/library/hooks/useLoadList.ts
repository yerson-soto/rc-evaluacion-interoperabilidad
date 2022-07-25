import { useAppDispatch, useAppSelector } from "redux/hooks";
import { CommonRepository } from "library/api/repositories/CommonRepository";
import { ErrorMessage } from "library/common/types";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { RootState } from 'redux/types';
import { useFetchList } from './useFetchList';

interface Actions<T> {
  start: ActionCreatorWithoutPayload;
  success: ActionCreatorWithPayload<T[]>;
  failure: ActionCreatorWithPayload<ErrorMessage>;
}

interface UseListParams<T> {
  actions: Actions<T>;
  service: CommonRepository<T>;
  selectResults: (state: RootState) => T[];
  selectLoading: (state: RootState) => boolean;
}

export function useLoadList<T>(params: UseListParams<T>) {
  const results = useAppSelector(params.selectResults);
  const isLoading = useAppSelector(params.selectLoading);
  const dispatch = useAppDispatch();
  const { service, actions } = params;

  useFetchList({
    service,
    onStart: () => dispatch(actions.start()),
    onSuccess: (data) => dispatch(actions.success(data)),
    onFailure: (error) => dispatch(actions.failure(error))
  })

  return { isLoading, results };
}
