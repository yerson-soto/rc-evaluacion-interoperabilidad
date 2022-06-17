import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageHeader } from "antd";
import { DomainList } from "./DomainList";
import { Questionary, QuestionaryProps } from "./Questionary";
import { Box } from "library/components/Box";
import { withIfDirective } from "library/hocs/withIfDirective";
import { useEvaluationInit } from "./useEvaluationInit";
import { Domain } from "library/models/Domain";

const DomainQuiz = withIfDirective<QuestionaryProps>(Questionary);

export default function EvaluationInit() {
  const { 
    isEvaluating, 
    currentDomain, 
    openEvaluation, 
    closeEvaluation 
  } = useEvaluationInit();

  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box>
      <PageHeader
        onBack={() => navigate("/evaluaciones")}
        title={t("headings.complete_evaluation")}
      />

      <DomainList onEvaluate={openEvaluation} onReset={() => {}} />

      <DomainQuiz
        if={isEvaluating}
        isOpen={isEvaluating}
        domain={currentDomain as Domain}
        onClose={closeEvaluation}
      />
    </Box>
  );
}
