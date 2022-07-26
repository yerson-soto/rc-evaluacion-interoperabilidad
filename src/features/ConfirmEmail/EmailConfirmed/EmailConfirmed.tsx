import React from "react";
import { Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useTimedRedirect } from 'library/hooks/useTimedRedirect';
import { paths } from "library/common/constants";

export default function EmailConfirmed() {
  const { t } = useTranslation();
  const { timeLeft } = useTimedRedirect(10, paths.auth.login.reverse());

  const message = t("texts.confirm_email_redirect", {
    timeLeft,
  });

  return <Alert message={message} type="info" showIcon />;
}
