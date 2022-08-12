import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Tabs } from "antd";
import { PieChartOutlined, FieldTimeOutlined, AimOutlined } from "@ant-design/icons";
import { AppBox } from "library/components/AppBox";
import { Summary } from "./Summary";
import { useEvaluation } from "./useEvaluation";
import { AppLoader } from "library/components/AppLoader";
import { NotFound } from "features/NotFound";
import { DomainList } from "features/EvaluationInit/DomainList";

export default function EvaluationDetail() {
  const { t } = useTranslation();
  const { evaluation, isLoading } = useEvaluation();

  if (isLoading) return <AppLoader text={t("loading.fetching_data")} />;
  if (!evaluation) return <NotFound />;

  return (
    <AppBox>
      <Summary evaluation={evaluation} />

      <Tabs
        tabBarStyle={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#ffffff",
          padding: "0 16px",
        }}
        defaultActiveKey="1"
        animated
      >
        <Tabs.TabPane
          tab={
            <span>
              <AimOutlined />
              Dominios
            </span>
          }
          key="1"
        >
          <Card>
            <DomainList />
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <PieChartOutlined />
              Estadísticas
            </span>
          }
          key="2"
        >
          <Card>Estadisticas</Card>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <FieldTimeOutlined />
              Detalles
            </span>
          }
          key="3"
        >
          <Card>Detail</Card>
        </Tabs.TabPane>
      </Tabs>
    </AppBox>
  );
}
