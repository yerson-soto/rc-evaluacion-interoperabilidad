import React from "react";
import { useTranslation } from "react-i18next";
import { Tabs } from "antd";
import { EyeOutlined, AimOutlined } from "@ant-design/icons";
import { AppBox } from "library/components/AppBox";
import { Summary } from "./Summary";
import { useEvaluation } from "./useEvaluation";
import { AppLoader } from "library/components/AppLoader";
import { NotFound } from "features/NotFound";
import { DomainList } from "./DomainList";
import { TableVersion } from "features/MaturityModel/TableVersion";

export default function EvaluationDetail() {
  const { t } = useTranslation();
  const { evaluation, isLoading } = useEvaluation();

  if (isLoading) return <AppLoader text={t("loading.fetching_data")} />;
  if (!evaluation) return <NotFound />;

  return (
    <AppBox>
      <Summary evaluation={evaluation} />

      <Tabs
        destroyInactiveTabPane
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
              {t("labels.domains")}
            </span>
          }
          key="1"
        >
          <DomainList />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <EyeOutlined />
              {t("labels.details")}
            </span>
          }
          key="2"
        >
          <TableVersion evaluation={evaluation} />
        </Tabs.TabPane>
      </Tabs>
    </AppBox>
  );
}
