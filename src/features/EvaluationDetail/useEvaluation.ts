import { useState, useEffect } from 'react';
import { EvaluationService } from 'library/api/services/EvaluationService';
import { Evaluation } from 'library/models/Evaluation';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function useEvaluation() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const evaluationService = new EvaluationService();

  const { uid } = useParams<Record<'uid', string>>();

  useEffect(() => {
    const fetchEvaluation = async (id: string) => {
      await evaluationService.getById(id)
        .then(result => {
          setEvaluation(result);
          setLoading(false);
        })
        .catch(() => {
          setEvaluation(null);
          setLoading(false);
        })
    }

    if (uid) fetchEvaluation(uid);

    // eslint-disable-next-line
  }, [uid]);

  return { evaluation, isLoading };
}