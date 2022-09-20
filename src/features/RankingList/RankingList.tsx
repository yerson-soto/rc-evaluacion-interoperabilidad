import React from "react";
import { Card, List, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { RankingItem } from "./RankingItem";
import { Ranking } from "library/models/Ranking";
import { FilterBar } from "library/components/FilterBar";
import { useRankingList } from "./useRankingList";
import { Toolbar } from "library/components/Toolbar";


export default function RankingList() {
  const {
    rankings,
    isLoading,
    filter,
    onFilterChange,
    sortByOptions,
    paginationConfig
  } = useRankingList();
  const { t } = useTranslation();

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Toolbar
        title={t("headings.ranking_list")}
        actions={null}
      />
      
      <FilterBar<Ranking>
        onChange={onFilterChange}
        defaults={filter}
        sortByOptions={sortByOptions}
        searchInputPlaceholder={t("placeholders.search_institutions")}
      />

      <Card>
        <List
          itemLayout="horizontal"
          size="large"
          pagination={paginationConfig}
          dataSource={rankings}
          renderItem={(item) => <RankingItem ranking={item} />}
        />
      </Card>
    </Space>
  );
}
