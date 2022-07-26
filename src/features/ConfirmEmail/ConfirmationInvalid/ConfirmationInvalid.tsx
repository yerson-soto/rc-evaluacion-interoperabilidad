import React from "react";
import { Alert } from "antd";
import { useTranslation } from "react-i18next";

export default function ConfirmationInvalid() {
  const { t } = useTranslation();

  return (
    <Alert type="error" message={t("alerts.confirm_email_failed")} showIcon />
  );
}
