import { EvaluationService } from 'library/api/services/EvaluationService';
import { useState } from 'react';
import { Evaluation } from 'library/models/Evaluation';

export function useEvaluation() {
  const [evaluation, setEvaluation] = useState<Evaluation>();
  const service = new EvaluationService();

  const fetchEvaluation = (id: string) => {
    service.getById(id)
      .then(result => setEvaluation(result))
    
  }

  return { fetchEvaluation, evaluation };
}