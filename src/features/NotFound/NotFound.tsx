import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Col, Result, Row } from "antd";
import { paths } from "library/common/constants";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToHome = () => navigate(paths.admin.index);

  return (
    <Row align="middle" style={{ height: "100%" }}>
      <Col span={24}>
        <Result
          status="404"
          title="404"
          subTitle={t("alerts.resource_not_found")}
          extra={
            <Button type="primary" onClick={goToHome}>
              {t("links.back_home")}
            </Button>
          }
        />
      </Col>
    </Row>
  );
}
