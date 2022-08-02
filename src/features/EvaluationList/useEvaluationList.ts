import { useEffect } from "react";
import { EvaluationService } from "library/api/services/EvaluationService";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { actions } from "redux/slices/evaluationSlice";
import { FilterValues } from 'library/common/interfaces';
import { Evaluation } from "library/models/Evaluation";

export function useEvaluationList() {
  const {
    results: evaluations,
    page,
    isLoading,
    pageSize,
    total,
    filter,
  } = useAppSelector((state) => state.evaluations);

  const dispatch = useAppDispatch();
  const evaluationService = new EvaluationService();

  useEffect(() => {
    filterEvaluations(page, filter);
  }, [page, filter]);

  const filterEvaluations = async (page: number, filter: FilterValues<Evaluation>) => {
    dispatch(actions.startLoading());

    evaluationService.filter(page, filter)
      .then((pagination) => dispatch(actions.filterSuccess(pagination)))
      .catch((errorMessage) => dispatch(actions.filterFailed(errorMessage)));
  };

  const onFilterChange = (values: FilterValues<Evaluation>): void => {
    dispatch(actions.filterChanged(values));
  }

  const onPageChange = (page: number): void => {
    dispatch(actions.pageChanged(page));
  }

  return {
    evaluations,
    pageSize,
    total,
    filter,
    isLoading,
    onFilterChange,
    onPageChange
  };
}
