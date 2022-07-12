import { Slice } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from 'main/store/index';
import { CrudCaseReducers, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { ID } from "library/common/types";

interface EditAction<T, State extends CrudState<T>, FormSchema> {
  service: new () => CrudRepository<T, FormSchema>;
  reducer: Slice<State, CrudCaseReducers<T, State>>;
  loadingSelector: (state: RootState) => boolean;
}

export function useEditAction<T, State extends CrudState<T>, FormSchema>({
  service: Service,
  loadingSelector,
  reducer,
}: EditAction<T, State, FormSchema>) {
  const isLoading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();
  const service = new Service();

  const editOne = async (id: ID, data: FormSchema): Promise<void> => {
    dispatch(reducer.actions.setLoading(true));
    
    return service.edit(id, data)
    .then(result => {
      dispatch(reducer.actions.editSuccess(result))
    })
    .catch((message) => {
      dispatch(reducer.actions.editFailed(message))
    })  
  };

  return { isLoading, editOne };
}
