import React from "react";
import { SortByOption, StatusOption } from "library/components/FilterBar";
import { usePaginateAction } from "features/Crud/usePaginateAction";
import { evaluationSlice } from "redux/slices/evaluationSlice";
import { useTranslation } from "react-i18next";
import { EvaluationService } from 'library/api/services/EvaluationService';
import { Evaluation } from "library/models/Evaluation";
import { EvaluationState } from 'redux/slices/evaluationSlice';
import { PaginationConfig } from 'antd/lib/pagination';
import { useAppSelector } from 'redux/hooks';
import { ManagerId } from "library/common/types";
import { EvaluationStatus } from 'library/common/enums';

export function useEvaluationList() {
  const service = new EvaluationService();
  const userId = useAppSelector(state => state.auth.user.uid);
  const { t } = useTranslation();
  const {
    total,
    results,
    isLoading,
    onFilterChange,
    filter,
    pageSize,
    onPageChange,
  } = usePaginateAction<Evaluation, EvaluationState, ManagerId>({
    service,
    reducer: evaluationSlice,
    selectState: (state) => state.evaluations,
    extraArg: userId
  });

  const paginationConfig: PaginationConfig = { 
    pageSize, 
    total, 
    onChange: onPageChange,
    showSizeChanger: false,
  };

  // TODO: Refactor: Move this
  const sortByOptions: SortByOption<Evaluation>[] = [
    { value: "dateStart", label: t("options.date_created") },
    { value: "organization", label: t("options.organization") },
    { value: "score", label: t("options.score") },
  ];

  const statusOptions: StatusOption<EvaluationStatus>[] = [
    { value: EvaluationStatus.Scheduled, label: t("status.scheduled") },
    { value: EvaluationStatus.Started, label: t("status.started") },
    { value: EvaluationStatus.Pending, label: t("status.pending") },
    { value: EvaluationStatus.Completed, label: t("status.completed") },
  ];

  return {
    evaluations: results,
    sortByOptions,
    statusOptions,
    filter,
    paginationConfig,
    onFilterChange,
    isLoading,
  };
}
