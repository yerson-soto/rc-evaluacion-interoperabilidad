import { message } from 'antd';
import { Slice } from "@reduxjs/toolkit";
import { RootState } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CrudCaseReducers, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/services/AbstractCrudService";
import { useTranslation } from 'react-i18next';

interface CreateAction<T, FormSchema, State extends CrudState<T>> {
  service: CrudRepository<T, FormSchema>;
  reducer: Slice<State, CrudCaseReducers<T, State>>;
  selectLoading: (state: RootState) => boolean;
}

export function useCreateAction<T, FormSchema, State extends CrudState<T>>({
  service,
  reducer,
  selectLoading
}: CreateAction<T, FormSchema, State>) {
  const isLoading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const createOne = async (data: FormSchema): Promise<void> => {
    dispatch(reducer.actions.startLoading());
    
    return service.create(data)
      .then(result => {
        dispatch(reducer.actions.createSuccess(result));

        // Display success message
        message.success(t("alerts.item_created"));
      })
      .catch((errorMessage) => {
        dispatch(reducer.actions.createFailed(errorMessage));
        
        message.error(errorMessage);

        throw new Error(errorMessage);
      })
  };

  return { isLoading, createOne };
}
