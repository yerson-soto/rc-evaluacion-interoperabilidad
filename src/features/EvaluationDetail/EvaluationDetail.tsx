import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Tabs } from "antd";
import { EyeOutlined, AimOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { AppBox } from "library/components/AppBox";
import { Summary } from "./Summary";
import { useEvaluation } from "./useEvaluation";
import { AppLoader } from "library/components/AppLoader";
import { NotFound } from "features/NotFound";
import { DomainList } from "./DomainList";
import { TableVersion } from "features/MaturityModel/TableVersion";
import { EvaluationStatus } from "library/common/enums";
import { InstitutionTimeline } from "./InstitutionTimeline";

const getItem = (
  label: React.ReactNode,
  key: string,
  icon: React.ReactNode,
  children: React.ReactNode,
  disabled?: boolean
) => {
  return {
    label: (
      <span>
        {icon}
        {label}
      </span>
    ),
    key,
    children,
    disabled
  };
};

// TODO: Refactor Completed Status
export default function EvaluationDetail() {
  const { t } = useTranslation();
  const { evaluation, isLoading } = useEvaluation();

  if (isLoading) return <AppLoader text={t("loading.fetching_data")} />;
  if (!evaluation) return <NotFound />;

  const isCompleted = evaluation.status === EvaluationStatus.Completed;
  const isScheduled = evaluation.status === EvaluationStatus.Scheduled;
  
  // TODO: Dont destroyInactiveTabPane

  const items = [
    getItem(
      t("labels.domains"),
      "1",
      <AimOutlined />,
      <DomainList />,
      isScheduled || isCompleted
    ),
    getItem(
      t("labels.maturity_model"),
      "2",
      <EyeOutlined />,
      <TableVersion evaluation={evaluation} />
    ),
    getItem(
      t("labels.timeline"),
      "3",
      <EyeOutlined />,
      <Card>
        <InstitutionTimeline id={evaluation.organization.id} />
      </Card>
    ),
  ];
  
  return (
    <AppBox>
      <Summary evaluation={evaluation} />

      <Tabs
        items={items}
        destroyInactiveTabPane
        tabBarStyle={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: "#ffffff",
          padding: "0 16px",
        }}
        defaultActiveKey={isCompleted ? "2" : "1"}
        animated
      />
    </AppBox>
  );
}
