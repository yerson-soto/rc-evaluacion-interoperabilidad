import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/types';
import { CrudReducer, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/services/AbstractCrudService";
import { ID } from "library/common/types";

interface DetailAction<T, State extends CrudState<T>> {
  service: CrudRepository<T, any>;
  reducer: CrudReducer<T, State>;
  selectLoading: (state: RootState) => boolean;
}

export function useDetailAction<T, State extends CrudState<T>>({
  service,
  selectLoading,
  reducer,
}: DetailAction<T, State>) {
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  const getById = async (id: ID): Promise<void> => {
    dispatch(reducer.actions.startLoading());
    
    return service.getById(id)
    .then(record => {
      dispatch(reducer.actions.deleteSuccess(id))
    })
    .catch((message) => {
      dispatch(reducer.actions.deleteFailed(message))
    })  
  };

  // return { isLoading, deleteOne };
}
