import React from "react";
import { Grid, Tabs, Typography } from "antd";
import { useTranslation } from 'react-i18next';
import { useListAction } from "features/Crud/useListAction";
import { domainSlice } from "redux/slices/domainSlice";
import { DomainService } from "library/api/services/DomainService";
import { CriterionPanel } from "../CriterionPanel";

export default function DomainTabs() {
  const { lg } = Grid.useBreakpoint();
  const { t } = useTranslation();
  const domainService = new DomainService();

  const { results: domains, isLoading } = useListAction({
    selectResults: (state) => state.domains.results,
    selectLoading: (state) => state.domains.isLoading,
    reducer: domainSlice,
    service: domainService,
  });

  // TODO: Evaluate empty domains and loading state, max-height
  return (
    <Tabs 
      defaultActiveKey="1" 
      tabPosition={lg ? "left" : "top"}
    >
      {domains.map((domain) => (
        <Tabs.TabPane
          key={domain.id}
          tab={`${t("labels.domain")} ${domain.name}`}
          destroyInactiveTabPane
        >
          <Typography.Title level={5}>
            {t("headings.domain_criteria_list", { domain: domain.name})}
          </Typography.Title>
          <CriterionPanel domain={domain} />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
