import React, { useState } from "react";
import { List, Grid } from "antd";
import { useNavigate } from "react-router-dom";
import { useEvaluationList } from "./useEvaluationList";
import { Space, PageHeader, Card, Empty, Button } from "antd";
import { EvaluationItem } from "./EvaluationItem";
import { ActiveEvaluation } from "./ActiveEvaluation";
import { PlusOutlined } from "@ant-design/icons";

import { Evaluation } from "library/models/Evaluation";
import { useTranslation } from "react-i18next";
import { PaginationFooter } from "library/components/PaginationFooter";
import { EvaluationFilter } from "./EvaluationFilter";

const { useBreakpoint } = Grid;

export default function EvaluationList() {
  const navigate = useNavigate();

  const { xl } = useBreakpoint();

  const { t } = useTranslation();

  const { isLoading, evaluations } = useEvaluationList();

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* <PageHeader
        style={{ padding: 0 }}
        onBack={() => navigate("/evaluaciones")}
        title="Evaluaciones"
        subTitle="Lista de evaluaciones tomadas..."
        extra={
          <Button
            type="primary"
            size="large"
            shape="circle"
            icon={<PlusOutlined />}
          />
        }
      /> */}

      {/* {evaluations.length > 0 && (
        <ActiveEvaluation evaluation={evaluations[0]} />
      )} */}

      {/* <EvaluationFilter /> */}

      <Card>
        <List<Evaluation>
          loading={isLoading}
          itemLayout={xl ? "horizontal" : "vertical"}
          size="large"
          dataSource={evaluations}
          footer={
            <PaginationFooter
              total={evaluations.length}
              label={t("pagination.evaluations")}
            />
          }
          pagination={{
            pageSize: 5,
            total: 50
          }}
          locale={{
            emptyText: <Empty description={t("empty.evaluations")} />,
          }}
          renderItem={(evaluation) => (
            <EvaluationItem key={evaluation.uid} evaluation={evaluation} />
          )}
        />
      </Card>
    </Space>
  );
}
