import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "main/store/index";
import { CommonRepository } from "library/repositories/CommonRepository";
import { ErrorMessage } from "library/common/types";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { RootState } from 'main/store/index';

interface Actions<T> {
  start: ActionCreatorWithoutPayload;
  success: ActionCreatorWithPayload<T[]>;
  failure: ActionCreatorWithPayload<ErrorMessage>;
}

interface UseListParams<T> {
  actions: Actions<T>;
  service: new () => CommonRepository<T>;
  selectResults: (state: RootState) => T[];
  selectLoading: (state: RootState) => boolean;
}

export function useFetchList<T>(params: UseListParams<T>) {
  const results = useAppSelector(params.selectResults);
  const isLoading = useAppSelector(params.selectLoading);
  const dispatch = useAppDispatch();
  const { service: Service, actions } = params;
  
  useEffect(() => {
    const fetchResults = (): void => {
      dispatch(actions.start());

      const service = new Service();

      service
        .getAll()
        .then((results) => dispatch(actions.success(results)))
        .catch((message) => dispatch(actions.failure(message)));
    };

    fetchResults();

    // eslint-disable-next-line
  }, []); 

  return { isLoading, results };
}
