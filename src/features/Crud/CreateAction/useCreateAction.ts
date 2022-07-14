import { Slice } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from 'main/store/index';
import { CrudCaseReducers, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";

interface CreateAction<T, FormSchema> {
  service: CrudRepository<T, FormSchema>;
  reducer: Slice<CrudState<T>, CrudCaseReducers<T, CrudState<T>>>;
  selectLoading: (state: RootState) => boolean;
}

export function useCreateAction<T, FormSchema>({
  service,
  reducer,
  selectLoading
}: CreateAction<T, FormSchema>) {
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const createOne = async (data: FormSchema): Promise<void> => {
    dispatch(reducer.actions.setLoading(true));
    
    return service.create(data)
      .then(result => {
        dispatch(reducer.actions.createSuccess(result))
      })
      .catch((message) => {
        dispatch(reducer.actions.createFailed(message))
      })  
  };

  return { isLoading, createOne };
}
