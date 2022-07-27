import React from "react";
import { Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useTimeoutRedirect } from "library/hooks/useTimeoutRedirect";
import { paths } from "library/common/constants";

const loginUrl = paths.auth.login.reverse();

export default function SuccessResult() {
  const { t } = useTranslation();
  const { timeLeft } = useTimeoutRedirect(10000, loginUrl);

  const message = t("texts.reset_password_redirect", {
    timeLeft,
  });

  return <Alert message={message} type="info" showIcon />;
}
