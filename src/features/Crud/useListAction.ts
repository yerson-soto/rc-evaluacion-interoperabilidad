import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'main/store/index';
import { CrudReducer } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";

interface ListAction<T> {
  service: CrudRepository<T, any>;
  reducer: CrudReducer<T>;
  selectLoading: (state: RootState) => boolean;
  selectResults: (state: RootState) => T[];
}

export function useListAction<T>({
  service,
  selectLoading,
  selectResults,
  reducer,
}: ListAction<T>) {
  const isLoading = useAppSelector(selectLoading);
  const results = useAppSelector(selectResults);
  const dispatch = useAppDispatch();

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

    // eslint-disable-next-line
  }, [])

  return { isLoading, results };
}
