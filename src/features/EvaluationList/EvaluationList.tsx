import React from "react";
import { List, Grid } from "antd";
import { useEvaluationList } from "./useEvaluationList";
import { Space, Card, Empty } from "antd";
import { EvaluationItem } from "./EvaluationItem";
import { Evaluation } from "library/models/Evaluation";
import { useTranslation } from "react-i18next";
import { Toolbar } from "library/components/Toolbar";
import { FilterBar } from "library/components/FilterBar";
import { EvaluationStatus, UserType } from 'library/common/enums';
import { useAppSelector } from 'redux/hooks';
import { AddEvaluation } from "./AddEvaluation";

const { useBreakpoint } = Grid;

// TODO: Change circle loader to Skeleton
export default function EvaluationList() {
  const { xl } = useBreakpoint();
  const { t } = useTranslation();
  const {
    evaluations,
    isLoading,
    onFilterChange,
    filter,
    paginationConfig,
    sortByOptions,
    statusOptions
  } = useEvaluationList();

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <EvaluationToolbar />

      <FilterBar<Evaluation, EvaluationStatus>
        onChange={onFilterChange}
        defaults={filter}
        sortByOptions={sortByOptions}
        statusOptions={statusOptions}
        searchInputPlaceholder={t("placeholders.search_evaluations")}
      />

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

function EvaluationToolbar() {
  const { t } = useTranslation();
  const userType = useAppSelector(state => state.auth.user.type);
  const canCreate = userType === UserType.Admin; 

  return (
    <Toolbar
      title={t("headings.evaluation_list")}
      actions={canCreate ? <AddEvaluation /> : null}
    />
  );
}
