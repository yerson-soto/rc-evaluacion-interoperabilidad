import { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'main/store/index';
import { CrudReducer } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { useDebouncedCallback} from 'use-debounce';

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

  const fetchResults = useDebouncedCallback(() => {
    dispatch(reducer.actions.setLoading(true));
      
    service.getAll()
    .then(results => {
      console.log('fetched', results);
      dispatch(reducer.actions.getSuccess(results))
    })
    .catch((message) => {
      dispatch(reducer.actions.getFailed(message))
    })  
  }, 1000, {
    leading: true,
    trailing: false
  })

  useEffect(() => {
    fetchResults();

    // eslint-disable-next-line
  }, [])

  return { isLoading, results };
}
