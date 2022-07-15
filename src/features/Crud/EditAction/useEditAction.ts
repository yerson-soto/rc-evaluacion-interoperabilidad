import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch, useAppSelector } from 'main/store/index';
import { CrudReducer } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { ID } from "library/common/types";

interface EditAction<T, FormSchema> {
  service: CrudRepository<T, FormSchema>;
  reducer: CrudReducer<T>;
  selectLoading: (state: RootState) => boolean;
}

export function useEditAction<T, FormSchema>({
  service,
  selectLoading,
  reducer,
}: EditAction<T, FormSchema>) {
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const editOne = async (id: ID, data: FormSchema): Promise<void> => {
    dispatch(reducer.actions.setLoading(true));
    
    return service.edit(id, data)
    .then(result => {
      dispatch(reducer.actions.editSuccess(result));

      message.success(t("alerts.item_created"));
    })
    .catch((errorMessage) => {
      dispatch(reducer.actions.editFailed(errorMessage))

      message.error(errorMessage);

      throw new Error(errorMessage);
    })  
  };   

  return { isLoading, editOne };
}
