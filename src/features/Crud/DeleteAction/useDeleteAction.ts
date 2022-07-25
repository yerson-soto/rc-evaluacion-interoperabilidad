import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/types';
import { CrudReducer } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { ID } from "library/common/types";

interface DeleteAction<T> {
  service: CrudRepository<T, any>;
  reducer: CrudReducer<T>;
  selectLoading: (state: RootState) => boolean;
}

export function useDeleteAction<T>({
  service,
  selectLoading,
  reducer,
}: DeleteAction<T>) {
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const deleteOne = async (id: ID): Promise<void> => {
    dispatch(reducer.actions.startLoading());
    
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
