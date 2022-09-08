import React from "react";
import { useTranslation } from "react-i18next";
import { List, Empty } from "antd";
import { Questionary } from "../Questionary";
import { useListAction } from 'features/Crud/useListAction';
import { domainSlice } from 'redux/slices/domainSlice';
import { DomainService } from 'library/api/services/DomainService';
import { useToggleQuestionary } from '../Questionary/useToggleQuestionary';
import { DomainItem } from '../DomainItem';

import classes from "./DomainList.module.css";


export default function DomainList() {
  const domainService = new DomainService()

  const { isLoading, results: domains } = useListAction({
    selectLoading: (state) => state.domains.isLoading,
    selectResults: (state) => state.domains.results,
    reducer: domainSlice,
    service: domainService
  });
  
  const { t } = useTranslation();
  const { open } = useToggleQuestionary();

  return (
    <React.Fragment>
      <List
        loading={isLoading}
        dataSource={domains}
        className={classes.container}
        size="large"
        pagination={false}
        grid={{
          gutter: 30,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        locale={{
          emptyText: <Empty description={t("empty.domains")} />,
        }}
        renderItem={(domain, key) => (
          <DomainItem key={key} domain={domain} onClick={() => open(domain)} />
        )}
      />

      <Questionary />
    </React.Fragment>
  );
}
