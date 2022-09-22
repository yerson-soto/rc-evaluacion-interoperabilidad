import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { FilterValues } from 'library/common/interfaces';
import { PaginationState } from 'library/common/interfaces';
import { PaginateRepository } from "library/api/services/AbstractListService";
import { PaginationReducer } from "redux/reducers/paginationReducers";
import { RootState } from "redux/types";

interface PaginateAction<T, State extends PaginationState<T>, ExtraArg> {
  service: PaginateRepository<T, ExtraArg>;
  reducer: PaginationReducer<T, State>;
  selectState: (state: RootState) => State;
  extraArg?: ExtraArg;
}

export function usePaginateAction<T, State extends PaginationState<T>, ExtraArgs = any>({
  service,
  reducer,
  selectState,
  extraArg
}: PaginateAction<T, State, ExtraArgs>) {
  const {
    results,
    page,
    isLoading,
    pageSize,
    total,
    filter,
  } = useAppSelector(selectState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    filterResults(page, filter);
  }, [page, filter]);

  const filterResults = async (page: number, filter: FilterValues<T>) => {
    dispatch(reducer.actions.startFiltering());

    service.paginate(page, filter, extraArg as ExtraArgs)
      .then((pagination) => dispatch(reducer.actions.filterSuccess(pagination)))
      .catch((errorMessage) => dispatch(reducer.actions.filterFailed(errorMessage)));
  };

  const onFilterChange = (values: FilterValues<T>): void => {
    dispatch(reducer.actions.filterChanged(values));
  }

  const onPageChange = (page: number): void => {
    dispatch(reducer.actions.pageChanged(page));
  }

  return {
    results,
    pageSize,
    total,
    filter,
    isLoading,
    onFilterChange,
    onPageChange
  };
}
