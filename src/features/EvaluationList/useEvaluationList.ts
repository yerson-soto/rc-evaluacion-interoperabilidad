import { useEffect } from "react";
import { EvaluationService } from "library/api/services/EvaluationService";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { actions } from "redux/slices/evaluationSlice";

export function useEvaluationList() {
  const { 
    results: evaluations, page: currentPage, isLoading, pageSize, total 
  } = useAppSelector((state) => state.evaluations);

  const dispatch = useAppDispatch();
  const evaluationService = new EvaluationService();

  useEffect(() => { getPagination(currentPage) }, []);

  const getPagination = async (page: number) => {
    dispatch(actions.startLoading());
  
    try {
      const pagination = await evaluationService.getPage(page);
      dispatch(actions.getPageSuccess(pagination));
    } catch (errorMessage: any) {
      dispatch(actions.getFailed(errorMessage));
    }
  };

  const changePage = async (page: number): Promise<void> => {
    await getPagination(page);
  };

  return { evaluations, currentPage, pageSize, total, isLoading, changePage };
}
