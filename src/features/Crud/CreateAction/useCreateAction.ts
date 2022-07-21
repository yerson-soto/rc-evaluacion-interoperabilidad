import { message } from 'antd';
import { Slice } from "@reduxjs/toolkit";
import { RootState } from 'redux/types';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CrudCaseReducers, CrudState } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const createOne = async (data: FormSchema): Promise<void> => {
    dispatch(reducer.actions.setLoading(true));
    
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
