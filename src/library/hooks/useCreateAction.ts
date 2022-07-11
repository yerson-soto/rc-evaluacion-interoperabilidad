import { Slice } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from 'main/store/index';
import { CrudCaseReducers, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";

interface CreateAction<T, State extends CrudState<T>, FormSchema> {
  service: new () => CrudRepository<T, FormSchema>;
  reducer: Slice<State, CrudCaseReducers<T, State>>;
  loadingSelector: (state: RootState) => boolean;
}

export function useCreateAction<T, State extends CrudState<T>, FormSchema>({
  service: Service,
  loadingSelector,
  reducer,
}: CreateAction<T, State, FormSchema>) {
  const isLoading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();
  const service = new Service();

  const create = (data: FormSchema): void => {
    dispatch(reducer.actions.setLoading(true));
    
    service.create(data).then(result => {
      dispatch(reducer.actions.createSuccess(result))
    })
    .catch((message) => {
      dispatch(reducer.actions.createFailed(message))
    })  
  };

  return { isLoading, create };
}
