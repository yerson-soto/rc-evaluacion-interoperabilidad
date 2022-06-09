import { useFetchList } from "library/hooks/useFetchList";
import { EvaluationService } from "main/services/EvaluationService";
import { useLoadList } from "library/hooks/useLoadList";
import * as actions from "main/store/slices/evaluationSlice";

export function useEvaluationList() {
  const { isLoading, results: evaluations } = useLoadList({
    selectLoading: (state) => state.evaluations.isLoading,
    selectResults: (state) => state.evaluations.results,
    service: EvaluationService,
    actions: {
      start: actions.evaluationsLoad,
      success: actions.evaluationsListed,
      failure: actions.evaluationsNotListed,
    },
  });

  return { isLoading, evaluations };
}
