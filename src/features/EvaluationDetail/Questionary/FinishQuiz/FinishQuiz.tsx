import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from 'react-i18next';

interface FinishQuizProps {
  onBack: () => void;
  onClose: () => void;
}

export default function FinishQuiz({ onClose, onBack }: FinishQuizProps) {
  const { t } = useTranslation();

  return (
    <Result
      status="success"
      title={t("labels.questionary_finished")}
      subTitle={t("alerts.questionary_finished")}
      extra={[
        <Button key="back" onClick={onBack}>{t("buttons.back")}</Button>,
        <Button type="primary" key="close" onClick={onClose}>
          {t("buttons.close")}
        </Button>,
      ]}
    />
  );
}
