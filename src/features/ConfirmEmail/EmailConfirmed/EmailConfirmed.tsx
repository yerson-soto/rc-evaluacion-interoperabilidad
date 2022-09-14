import React from "react";
import { Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useTimeoutRedirect } from "library/hooks/useTimeoutRedirect";
import { paths } from "library/common/constants";

const loginUrl = paths.auth.login.fullPath;

export default function EmailConfirmed() {
  const { t } = useTranslation();
  const { timeLeft } = useTimeoutRedirect(10000, loginUrl);

  const description = t("texts.confirm_email_redirect", {
    timeLeft,
  });

  return (
    <Alert
      message={t("alerts.confirm_email_success")}
      description={description}
      type="info"
      showIcon
    />
  );
}
