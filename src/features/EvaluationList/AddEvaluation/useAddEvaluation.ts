import { useAppDispatch } from 'main/store/index';
import { EvaluationService } from 'library/api/services/EvaluationService';
import { evaluationCreated, evaluationNotCreated } from "main/store/slices/evaluationSlice";

export function useAddEvaluation() {
  const dispatch = useAppDispatch();

  const createEvaluation = async (organization: number): Promise<void> => {
    const service = new EvaluationService();

    await service.createNew(organization)
      .then(evaluation => dispatch(evaluationCreated(evaluation)))
      .catch((message) => dispatch(evaluationNotCreated(message)))
  }

  return { createEvaluation };
}
