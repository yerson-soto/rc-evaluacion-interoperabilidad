import { useEffect, useContext } from 'react';
import { EvaluationService } from 'library/api/services/EvaluationService';
import { EvaluationDetailContext } from './EvaluationContext';
import { useParams } from 'react-router-dom';

export function useEvaluation() {
  const evaluationService = new EvaluationService();
  const { setEvaluation, evaluationState } = useContext(EvaluationDetailContext);
  const { evaluation, isLoading } = evaluationState;

  const { uid } = useParams<Record<'uid', string>>();

  useEffect(() => {
    const fetchEvaluation = async (id: string) => {
      await evaluationService.getById(id)
        .then(result => {
          setEvaluation(result);
        })
        .catch(() => {
          setEvaluation(null);
        })
    }

    if (uid) fetchEvaluation(uid);

    // eslint-disable-next-line
  }, [uid]);

  return { evaluation, isLoading };
}