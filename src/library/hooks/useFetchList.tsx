import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "main/store/index";
import { CommonRepository } from "library/repositories/CommonRepository";
import { ErrorMessage } from "library/common/types";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";


interface Actions<T> {
  start: ActionCreatorWithoutPayload;
  success: ActionCreatorWithPayload<T[]>;
  failure: ActionCreatorWithPayload<ErrorMessage>;
}

interface UseListParams<T> {
  service: new () => CommonRepository<T>;
  actions: Actions<T>;
}

export function useFetchList<T>(params: UseListParams<T>) {
  const results = useAppSelector((state) => state.evaluations);
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
  }, []);

  return { isLoading: results.isLoading, results: results.results };
}
