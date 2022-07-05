import React from "react";
import { Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useSuccessResult } from "./useSuccessResult";

export default function SuccessResult() {
  const { t } = useTranslation();
  const { timeLeft } = useSuccessResult();

  const message = t("texts.reset_password_redirect", {
    timeLeft,
  });

  return <Alert message={message} type="info" showIcon />;
}
