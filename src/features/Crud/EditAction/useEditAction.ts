import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { RootState } from 'redux/types';
import { CrudReducer, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/services/AbstractCrudService";
import { ID } from "library/common/types";

interface EditAction<T, FormSchema, State extends CrudState<T>> {
  service: CrudRepository<T, FormSchema>;
  reducer: CrudReducer<T, State>;
  selectLoading: (state: RootState) => boolean;
}

export function useEditAction<T, FormSchema, State extends CrudState<T>>({
  service,
  selectLoading,
  reducer,
}: EditAction<T, FormSchema, State>) {
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const editOne = async (id: ID, data: FormSchema): Promise<void> => {
    dispatch(reducer.actions.startLoading());
    
    return service.edit(id, data)
    .then(result => {
      dispatch(reducer.actions.editSuccess(result));

      message.success(t("alerts.item_edited"));
    })
    .catch((errorMessage) => {
      dispatch(reducer.actions.editFailed(errorMessage))

      message.error(errorMessage);

      throw new Error(errorMessage);
    })  
  };   

  return { isLoading, editOne };
}
