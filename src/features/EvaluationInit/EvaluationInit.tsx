import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageHeader } from "antd";
import { DomainList } from "./DomainList";
import { Questionary } from "./Questionary";
import { Box } from "library/components/Box";
import { useEvaluationInit } from "./useEvaluationInit";

export default function EvaluationInit() {
  const { isOpen, openEvaluation, closeEvaluation } = useEvaluationInit();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box>
      <PageHeader
        onBack={() => navigate("/evaluaciones")}
        title={t("headings.complete_evaluation")}
      />

      <DomainList onEvaluate={openEvaluation} onReset={() => {}} />
      <Questionary isOpen={isOpen} onClose={closeEvaluation} />
    </Box>
  );
}
