import { useFetchList } from "library/hooks/useFetchList";
import { EvaluationService } from 'main/services/EvaluationService';
import * as actions from 'main/store/slices/evaluationSlice';

export function useEvaluationList() {
  const { isLoading, results: evaluations } = useFetchList({
    service: EvaluationService,
    actions: {
      start: actions.evaluationsLoad,
      success: actions.evaluationsListed,
      failure: actions.evaluationsNotListed
    }
  });

  return { isLoading, evaluations };
}
