import React from "react";
import { Ranking } from "library/models/Ranking";
import { SortByOption } from "library/components/FilterBar";
import { usePaginateAction } from "features/Crud/usePaginateAction";
import { RankingState } from "redux/slices/rankingSlice";
import { RankingService } from "library/api/services/RankingService";
import { rankingSlice } from "redux/slices/rankingSlice";
import { useTranslation } from "react-i18next";
import { PaginationConfig } from 'antd/lib/pagination';

export function useRankingList() {
  const service = new RankingService();
  const { t } = useTranslation();
  const {
    total,
    results,
    isLoading,
    onFilterChange,
    filter,
    pageSize,
    onPageChange,
  } = usePaginateAction<Ranking, RankingState>({
    service,
    reducer: rankingSlice,
    selectState: (state) => state.rankings,
  });

  const paginationConfig: PaginationConfig = { 
    pageSize, 
    total, 
    onChange: onPageChange,
    showSizeChanger: false,
  };

  const sortByOptions: SortByOption<Ranking>[] = [
    { value: "institution", label: t("options.organization") },
    { value: "score", label: t("options.score") },
  ];

  return {
    rankings: results,
    sortByOptions,
    filter,
    paginationConfig,
    onFilterChange,
    isLoading,
  };
}
