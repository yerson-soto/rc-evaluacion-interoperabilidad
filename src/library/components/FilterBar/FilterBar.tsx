import React from "react";
import { useTranslation } from "react-i18next";
import { Card, Input, Select } from "antd";
import { useDebouncedCallback } from "use-debounce";
import { SortType } from "library/common/types";
import { FilterValues } from "library/common/interfaces";
import { AppBox } from "library/components/AppBox";

import classes from "./FilterBar.module.css";

export interface SortByOption<T> {
  value: keyof T;
  label: string;
}

export interface StatusOption<Status> {
  value: Status;
  label: string;
}

interface FilterBarProps<T, Status> {
  onChange: (filter: FilterValues<T, Status>) => void;
  defaults: FilterValues<T, Status>;
  searchInputPlaceholder?: string;
  sortByOptions: SortByOption<T>[];
  statusOptions?: StatusOption<Status>[];
}

export default function FilterBar<T, Status = any>(props: FilterBarProps<T, Status>) {
  const { t } = useTranslation();
  const {
    defaults,
    onChange,
    sortByOptions,
    statusOptions,
    searchInputPlaceholder = t("placeholders.search"),
  } = props;

  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const search = event.target.value;
      onChange({ ...defaults, search });
    },
    300
  );

  const handleSortBy = (sortBy: keyof T) => {
    onChange({ ...defaults, sortBy });
  };

  const handleSortType = (sortType: SortType) => {
    onChange({ ...defaults, sortType });
  };

  const handleStatus = (status: Status[]) => {
    onChange({ ...defaults, status });
  };

  return (
    <Card>
      <AppBox className={classes.wrapper}>
        {statusOptions && (
          <Select
            mode="multiple"
            defaultValue={defaults.status as any}
            className={classes.select}
            onChange={handleStatus}
            maxTagCount="responsive"
            placeholder={t("placeholders.select_statuses")}
          >
            {statusOptions.map((option, key) => (
              <Select.Option key={key} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )}

        <Select
          defaultValue={defaults.sortBy}
          className={classes.select}
          onChange={handleSortBy}
        >
          {sortByOptions.map((option, key) => (
            <Select.Option key={key} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
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
          placeholder={searchInputPlaceholder}
          onChange={handleSearch}
          enterButton
        />
      </AppBox>
    </Card>
  );
}
