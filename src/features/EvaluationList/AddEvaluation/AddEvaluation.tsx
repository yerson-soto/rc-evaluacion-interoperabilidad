import React from 'react';
import { useTranslation } from 'react-i18next';
import { Evaluation } from "library/models/Evaluation";
import { CreateAction } from "features/Crud/CreateAction";
import { EvaluationFormSchema } from "features/EvaluationList/EvaluationForm/EvaluationFormSchema";
import { evaluationSlice, EvaluationState } from "redux/slices/evaluationSlice";
import { EvaluationService } from "library/api/services/EvaluationService";
import { EvaluationForm } from '../EvaluationForm';

interface AddEvaluationProps {
  defaultValues?: EvaluationFormSchema;
  triggerRender?: (trigger: () => void) => React.ReactNode;
}

export default function AddEvaluation(props: AddEvaluationProps) {
  const evaluationService = new EvaluationService();
  const { defaultValues, triggerRender } = props;
  const { t } = useTranslation();
  
  return (
    <CreateAction<
      Evaluation, 
      EvaluationFormSchema, 
      EvaluationState
    >
      key="new-event"
      toggleKey="create-evaluation"
      title={t("buttons.new")}
      reducer={evaluationSlice}
      service={evaluationService}
      selectLoading={(state) => state.auth.isLoading}
      renderTrigger={triggerRender}
      renderForm={({ visible, loading, onClose, onSave }) => (
        <EvaluationForm
          show={visible}
          isLoading={loading}
          onHide={onClose}
          onSave={onSave}
          defaults={defaultValues}
        />
      )}
    />
  )
}
