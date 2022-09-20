import { useEffect, useState } from 'react';
import { EvaluationService } from 'library/api/services/EvaluationService';
import { Evaluation } from 'library/models/Evaluation';

export function useInstitutionTimeline(institutionId: number) {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setloading] = useState(false);
  const evaluationService = new EvaluationService();

  useEffect(() => {
    const fetchTimeline = async () => {
      await evaluationService
        .getTimeline(institutionId)
        .then(evaluations => {
          setEvaluations(evaluations);
        })
        .catch(() => {
          setEvaluations([]);
        })
        .finally(() => {
          setloading(false);
        })
    }

    fetchTimeline();

    // eslint-disable-next-line
  }, []);

  return { evaluations, isLoading };
}