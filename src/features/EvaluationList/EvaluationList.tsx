import React from "react";
import { List, Grid, Button } from "antd";
import { useEvaluationList } from "./useEvaluationList";
import { Space, Card, Empty } from "antd";
import { EvaluationItem } from "./EvaluationItem";
import { ActiveEvaluation, ActiveEvaluationProps } from "./ActiveEvaluation";
import { Evaluation } from "library/models/Evaluation";
import { useTranslation } from "react-i18next";
import { EvaluationFilter } from "./EvaluationFilter";
import { withIfDirective } from "library/hocs/withIfDirective";
import { Toolbar } from "library/components/Toolbar";
import { PlusOutlined } from "@ant-design/icons";

const ActiveEvaluationIf =
  withIfDirective<ActiveEvaluationProps>(ActiveEvaluation);

const { useBreakpoint } = Grid;

// Show total
export default function EvaluationList() {
  const { evaluations, total, filter, pageSize, isLoading, onFilterChange, onPageChange } =
    useEvaluationList();

  const { xl } = useBreakpoint();
  const { t } = useTranslation();

  const paginationConfig = {
    pageSize,
    total,
    onChange: onPageChange,
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* <ActiveEvaluationIf
        if={evaluations.length > 0}
        evaluation={evaluations[0]}
      /> */}

      <Toolbar
        title={t("headinds.evaluation_list")}
        actions={
          <Button
            type="primary"
            shape="round"
            block
            icon={<PlusOutlined />}
            onClick={() => {}}
          >
            Agregar
          </Button>
        }
      />

      <EvaluationFilter onChange={onFilterChange} defaults={filter}  />

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
