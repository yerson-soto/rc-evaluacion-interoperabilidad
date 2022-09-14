import React from "react";
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { paths } from "library/common/constants";

export default function ForbiddenLink() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToLogin = () => navigate(paths.auth.login.fullPath);

  return (
    <Result
      status="403"
      title="403"
      subTitle={t("alerts.reset_link_invalid")}
      extra={
        <Button type="primary" onClick={goToLogin}>
          {t("links.back_login")}
        </Button>
      }
    />
  );
}
