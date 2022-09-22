import { useEffect } from 'react';
import { RootState } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CrudReducer, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/services/AbstractCrudService";
import { useFetchDebounced } from 'library/hooks/useFetchDebounced';

interface ListAction<T, State extends CrudState<T>> {
  service: CrudRepository<T, any>;
  reducer: CrudReducer<T, State>;
  selectLoading: (state: RootState) => boolean;
  selectResults: (state: RootState) => T[];
}

export function useListAction<T, State extends CrudState<T>>({
  service,
  selectLoading,
  selectResults,
  reducer,
}: ListAction<T, State>) {
  const isLoading = useAppSelector(selectLoading);
  const results = useAppSelector(selectResults);
  const dispatch = useAppDispatch();

  const fetchResults = useFetchDebounced(() => {
    dispatch(reducer.actions.startLoading());
      
    service.getAll()
    .then(results => {
      dispatch(reducer.actions.getSuccess(results))
    })
    .catch((message) => {
      dispatch(reducer.actions.getFailed(message))
    })  
  })

  useEffect(() => {
    fetchResults();

    // eslint-disable-next-line
  }, [])

  return { isLoading, results };
}
