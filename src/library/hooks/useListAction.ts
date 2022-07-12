import { useEffect } from 'react';
import { Slice } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from 'main/store/index';
import { CrudCaseReducers, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";

interface ListAction<T, State extends CrudState<T>, FormSchema> {
  service: new () => CrudRepository<T, FormSchema>;
  reducer: Slice<State, CrudCaseReducers<T, State>>;
  loadingSelector: (state: RootState) => boolean;
  resultsSelector: (state: RootState) => T[];
}

export function useListAction<T, State extends CrudState<T>, FormSchema>({
  service: Service,
  loadingSelector,
  resultsSelector,
  reducer,
}: ListAction<T, State, FormSchema>) {
  const isLoading = useAppSelector(loadingSelector);
  const results = useAppSelector(resultsSelector);
  const dispatch = useAppDispatch();
  const service = new Service();

  useEffect(() => {
    const fetchResults = (): void => {
      dispatch(reducer.actions.setLoading(true));
      
      service.getAll()
      .then(results => {
        dispatch(reducer.actions.getSuccess(results))
      })
      .catch((message) => {
        dispatch(reducer.actions.getFailed(message))
      })  
    };
    
    fetchResults();
  }, [])

  return { isLoading, results };
}
