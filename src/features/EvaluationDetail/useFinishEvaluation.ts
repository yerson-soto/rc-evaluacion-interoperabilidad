import { useState } from 'react';
import { EvaluationService } from 'library/api/services/EvaluationService';
import { useNavigate } from 'react-router-dom';
import { paths } from 'library/common/constants';
import { message } from 'antd';

export function useFinishEvaluation() {
  const [isLoading, setLoading] = useState(false);
  const evaluationService = new EvaluationService();

  const navigate = useNavigate();

  const finishEvaluation = (uid: string) => {
    setLoading(true);
    
    evaluationService.finish(uid)
      .then(() => {
        setLoading(false);
        navigate('/evaluaciones');
      })
      .catch((errmesage) => {
        setLoading(false);
        
        // TODO: Change to i18n
        message.error(errmesage)
      })
  }

  return { finishEvaluation, isLoading };
}