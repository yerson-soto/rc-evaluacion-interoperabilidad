import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { FilterValues } from 'library/common/interfaces';
import { PaginationState } from 'library/common/interfaces';
import { PaginateRepository } from "library/api/services/AbstractListService";
import { PaginationReducer } from "redux/reducers/paginationReducers";
import { RootState } from "redux/types";

interface PaginateAction<T, State extends PaginationState<T>> {
  service: PaginateRepository<T>;
  reducer: PaginationReducer<T, State>;
  selectState: (state: RootState) => State;
}

export function usePaginateAction<T, State extends PaginationState<T>>({
  service,
  reducer,
  selectState
}: PaginateAction<T, State>) {
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

    service.filter(page, filter)
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
