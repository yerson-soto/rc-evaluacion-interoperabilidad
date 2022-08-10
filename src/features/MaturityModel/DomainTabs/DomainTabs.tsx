import React from "react";
import { Grid, Tabs, Typography } from "antd";
import { useListAction } from "features/Crud/useListAction";
import { domainSlice } from "redux/slices/domainSlice";
import { DomainService } from "library/api/services/DomainService";
import { CriterionPanel } from "../CriterionPanel";

export default function ChoiceCrud() {
  const { lg } = Grid.useBreakpoint();
  const domainService = new DomainService();

  const { results: domains, isLoading } = useListAction({
    selectResults: (state) => state.domains.results,
    selectLoading: (state) => state.domains.isLoading,
    reducer: domainSlice,
    service: domainService,
  });

  // TODO: Evaluate empty domains and loading state
  return (
    <Tabs 
      defaultActiveKey="1" 
      tabPosition={lg ? "left" : "top"}
      // tabBarExtraContent={{
      //   left: <Typography.Text>Dominios: </Typography.Text>,
      // }}
    >
      {domains.map((domain) => (
        <Tabs.TabPane
          key={domain.id}
          tab={domain.name}
          destroyInactiveTabPane
        >
          <CriterionPanel domain={domain} />
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}
