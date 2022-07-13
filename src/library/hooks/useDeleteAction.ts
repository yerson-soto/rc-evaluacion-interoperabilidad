import { Slice } from "@reduxjs/toolkit";
import { RootState, useAppDispatch, useAppSelector } from 'main/store/index';
import { CrudCaseReducers, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { ID } from "library/common/types";

interface DeleteAction<T, State extends CrudState<T>> {
  service: new () => CrudRepository<T, any>;
  reducer: Slice<State, CrudCaseReducers<T, State>>;
  loadingSelector: (state: RootState) => boolean;
}

export function useDeleteAction<T, State extends CrudState<T>>({
  service: Service,
  loadingSelector,
  reducer,
}: DeleteAction<T, State>) {
  const isLoading = useAppSelector(loadingSelector);
  const dispatch = useAppDispatch();
  const service = new Service();

  const deleteOne = async (id: ID): Promise<void> => {
    dispatch(reducer.actions.setLoading(true));
    
    return service.delete(id)
    .then(() => {
      dispatch(reducer.actions.deleteSuccess(id))
    })
    .catch((message) => {
      dispatch(reducer.actions.deleteFailed(message))
    })  
  };

  return { isLoading, deleteOne };
}
