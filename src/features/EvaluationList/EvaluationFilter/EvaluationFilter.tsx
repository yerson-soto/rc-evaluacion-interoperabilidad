import React from "react";
import { useTranslation } from 'react-i18next';
import { Card, Input, Select } from "antd";
import { useDebouncedCallback } from 'use-debounce';
import { SortType } from "library/common/types";
import { FilterValues } from "library/common/interfaces";
import { Evaluation } from "library/models/Evaluation";
import { AppBox } from "library/components/AppBox";

import classes from './EvaluationFilter.module.css';

interface EvaluationFilterProps {
  onChange: (filter: FilterValues<Evaluation>) => void;
  defaults: FilterValues<Evaluation>;
}

export default function EvaluationFilter({ onChange, defaults }: EvaluationFilterProps) {
  const { t } = useTranslation();

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      onChange({ ...defaults, search });
    }, 
    300
  );

  const handleSortBy = (sortBy: keyof Evaluation) => {
    onChange({ ...defaults, sortBy });
  }

  const handleSortType = (sortType: SortType) => {
    onChange({ ...defaults, sortType });
  }
  
  return (
    <Card>
      <AppBox className={classes.wrapper}>
      <Select
        defaultValue={defaults.sortBy}
        className={classes.select}
        onChange={handleSortBy}
      >
        <Select.Option value="dateCreated">{t("options.date_created")}</Select.Option>
        <Select.Option value="organization">{t("options.organization")}</Select.Option>
        <Select.Option value="score">{t("options.score")}</Select.Option>
      </Select>

      <Select
        defaultValue={defaults.sortType}
        className={classes.select}
        onChange={handleSortType}
      >
        <Select.Option value="asc">{t("options.asc")}</Select.Option>
        <Select.Option value="desc">{t("options.desc")}</Select.Option>
      </Select>

      <Input.Search
        className={classes.search}
        defaultValue={defaults.search}
        placeholder={t("placeholders.search_evaluations")}
        onChange={handleSearch}
        enterButton
      />
        </AppBox>
    </Card>
  );
}
