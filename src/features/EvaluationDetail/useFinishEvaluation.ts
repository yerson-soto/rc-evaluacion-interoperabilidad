import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EvaluationService } from 'library/api/services/EvaluationService';
import { useNavigate } from 'react-router-dom';
import { paths } from 'library/common/constants';
import { message } from 'antd';

export function useFinishEvaluation() {
  const [isLoading, setLoading] = useState(false);
  const evaluationService = new EvaluationService();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const finishEvaluation = (uid: string) => {
    setLoading(true);
    
    evaluationService.finish(uid)
      .then(() => {
        setLoading(false);
        
        message.error(t("alerts.finish_evaluation_success"));
        navigate(paths.admin.evaluations.index);
      })
      .catch((errmesage) => {
        setLoading(false);
        
        // TODO: Change to i18n
        message.error(errmesage);
      })
  }

  return { finishEvaluation, isLoading };
}