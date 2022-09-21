import React from "react";
import { useTranslation } from "react-i18next";
import { List, Empty } from "antd";
import { Questionary } from "../Questionary";
import { useListAction } from 'features/Crud/useListAction';
import { domainSlice } from 'redux/slices/domainSlice';
import { DomainService } from 'library/api/services/DomainService';
import { DomainItem } from '../DomainItem';
import { useToggleParam } from 'library/hooks/useToggleParam';

import classes from "./DomainList.module.css";
import { Domain } from 'library/models/Domain';
import { keys } from '../../../library/common/constants';


export default function DomainList() {
  const domainService = new DomainService()

  const { t } = useTranslation();
  const { setOpen } = useToggleParam(keys.domainParamName);
  const { isLoading, results: domains } = useListAction({
    selectLoading: (state) => state.domains.isLoading,
    selectResults: (state) => state.domains.results,
    reducer: domainSlice,
    service: domainService
  });
  
  const handleView = (domain: Domain): void => {
    setOpen(domain.id.toString());
  }

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
          <DomainItem key={key} domain={domain} onClick={() => handleView(domain)} />
        )}
      />

      <Questionary />
    </React.Fragment>
  );
}
