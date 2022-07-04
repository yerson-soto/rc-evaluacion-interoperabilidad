import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { paths } from "library/common/constants";

export default function SuccessResult() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToLogin = () => navigate(paths.auth.login.reverse());

  return (
    <Result
      status="success"
      title={t("alerts.reset_password_success")}
      subTitle={t("texts.reset_password_success")}
      extra={[
        <Button type="primary" onClick={goToLogin}>
          {t("links.back_login")}
        </Button>,
      ]}
    />
  );
}
