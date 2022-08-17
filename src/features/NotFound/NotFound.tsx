import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Col, Result, Row } from "antd";
import { paths } from "library/common/constants";

interface NotFound {
  fallbackLabel?: string;
  onFallback?: () => void;
}

export default function NotFound(props: NotFound) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    fallbackLabel = t("links.back_home"),
    onFallback = () => navigate(paths.admin.index),
  } = props;

  return (
    <Row align="middle" style={{ height: "100%" }}>
      <Col span={24}>
        <Result
          status="404"
          title="404"
          subTitle={t("alerts.resource_not_found")}
          extra={
            <Button type="primary" onClick={onFallback}>
              {fallbackLabel}
            </Button>
          }
        />
      </Col>
    </Row>
  );
}
