import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageHeader } from "antd";
import { DomainList } from "./DomainList";
import { Questionary } from "./Questionary";
import { AppBox } from "library/components/AppBox";
import { useEvaluationInit } from "./useEvaluationInit";
import { withIfDirective } from "library/hocs/withIfDirective";
import { QuestionaryProps } from "./Questionary/Questionary";

const QuestionaryIf = withIfDirective<QuestionaryProps>(Questionary);

export default function EvaluationInit() {
  const { isOpen, domain, setOpen, setClose, afterClosed } = useEvaluationInit();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <AppBox>
      <PageHeader
        onBack={() => navigate("/evaluaciones")}
        title={t("headings.complete_evaluation")}
      />

      <DomainList onEvaluate={setOpen} onReset={() => {}} />

      <QuestionaryIf
        if={!!domain}
        isOpen={isOpen}
        domain={domain}
        onClose={setClose}
        onCloseEnd={afterClosed}
      />
    </AppBox>
  );
}
