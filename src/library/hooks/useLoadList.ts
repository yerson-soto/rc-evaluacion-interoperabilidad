import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { ErrorMessage } from "library/common/types";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { RootState } from 'redux/types';
import { ListRepository } from 'library/api/services/AbstractListService';

interface Actions<T> {
  start: ActionCreatorWithoutPayload;
  success: ActionCreatorWithPayload<T[]>;
  failure: ActionCreatorWithPayload<ErrorMessage>;
}

interface UseListParams<T> {
  actions: Actions<T>;
  service: ListRepository<T>;
  selectResults: (state: RootState) => T[];
  selectLoading: (state: RootState) => boolean;
}

export function useLoadList<T>(params: UseListParams<T>) {
  const results = useAppSelector(params.selectResults);
  const isLoading = useAppSelector(params.selectLoading);
  const dispatch = useAppDispatch();
  const { service, actions } = params;

  useEffect(() => {
    const fetchResults = async () => {
      dispatch(actions.start());

      try {
        const results = await service.getAll();
        dispatch(actions.success(results));
      } catch (message) {
        dispatch(actions.failure(message as any))
      }
    };

    fetchResults();

    // eslint-disable-next-line
  }, []);

  return { isLoading, results };
}
