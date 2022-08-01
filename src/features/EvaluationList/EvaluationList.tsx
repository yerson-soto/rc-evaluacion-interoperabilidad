import React from "react";
import { List, Grid } from "antd";
import { useEvaluationList } from "./useEvaluationList";
import { Space, Card, Empty } from "antd";
import { EvaluationItem } from "./EvaluationItem";
import { ActiveEvaluation, ActiveEvaluationProps } from "./ActiveEvaluation";
import { Evaluation } from "library/models/Evaluation";
import { useTranslation } from "react-i18next";
import { EvaluationFilter } from "./EvaluationFilter";
import { withIfDirective } from "library/hocs/withIfDirective";

const ActiveEvaluationIf = withIfDirective<ActiveEvaluationProps>(ActiveEvaluation);

const { useBreakpoint } = Grid;

// Show total
export default function EvaluationList() {
  const { evaluations, total, pageSize, isLoading, changePage } =
    useEvaluationList();
  const { xl } = useBreakpoint();
  const { t } = useTranslation();

  const paginationConfig = {
    pageSize,
    total,
    onChange: changePage,
  }

  return (
    <Space 
      direction="vertical" 
      size="large" 
      style={{ width: "100%" }}
    >
      <ActiveEvaluationIf
        if={evaluations.length > 0}
        evaluation={evaluations[0]}
      />

      <EvaluationFilter onSearch={async () => {}} />

      <Card>
        <List<Evaluation>
          size="large"
          loading={isLoading}
          itemLayout={xl ? "horizontal" : "vertical"}
          dataSource={evaluations}
          pagination={paginationConfig}
          renderItem={(item) => (
            <EvaluationItem key={item.uid} evaluation={item} />
          )}
          locale={{
            emptyText: <Empty description={t("empty.evaluations")} />,
          }}
        />
      </Card>
    </Space>
  );
}
