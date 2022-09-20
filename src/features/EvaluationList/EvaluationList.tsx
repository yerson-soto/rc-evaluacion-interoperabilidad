import React from "react";
import { List, Grid } from "antd";
import { useEvaluationList } from "./useEvaluationList";
import { Space, Card, Empty } from "antd";
import { EvaluationItem } from "./EvaluationItem";
import { Evaluation } from "library/models/Evaluation";
import { useTranslation } from "react-i18next";
import { Toolbar } from "library/components/Toolbar";
import { EvaluationForm } from "features/EvaluationCrud/EvaluationForm";
import { CreateAction } from "features/Crud/CreateAction";
import { EvaluationFormSchema } from "features/EvaluationCrud/EvaluationForm/EvaluationFormSchema";
import { evaluationSlice, EvaluationState } from "redux/slices/evaluationSlice";
import { EvaluationService } from "library/api/services/EvaluationService";
import { FilterBar } from "library/components/FilterBar";

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
  } = useEvaluationList();

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <EvaluationToolbar />

      <FilterBar<Evaluation>
        onChange={onFilterChange}
        defaults={filter}
        sortByOptions={sortByOptions}
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
  const evaluationService = new EvaluationService();
  const { t } = useTranslation();

  const renderCreateAction = () => (
    <CreateAction<Evaluation, EvaluationFormSchema, EvaluationState>
      toggleKey="create-evaluation"
      title={t("buttons.new")}
      reducer={evaluationSlice}
      service={evaluationService}
      selectLoading={(state) => state.auth.isLoading}
      render={({ visible, loading, onClose, onSave }) => (
        <EvaluationForm
          show={visible}
          isLoading={loading}
          onHide={onClose}
          onSave={onSave}
        />
      )}
    />
  );

  return (
    <Toolbar
      title={t("headings.evaluation_list")}
      actions={renderCreateAction()}
    />
  );
}
