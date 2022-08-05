import React from "react";
import { ColumnsType } from "antd/lib/table";
import { Card, Tabs, Tag } from "antd";
import { Trans, useTranslation } from "react-i18next";
import { ChoiceFormSchema } from "./ChoiceForm/ChoiceFormSchema";
import { Choice } from "library/models/Choice";
import { ChoiceService } from "library/api/services/ChoiceService";
import { AppDrawer } from "library/components/AppDrawer";
import { Crud } from "features/Crud";
import { choiceSlice, ChoiceState } from "redux/slices/choiceSlice";
import { ChoiceForm } from "./ChoiceForm";

import { useListAction } from "features/Crud/useListAction";
import { domainSlice } from "redux/slices/domainSlice";
import { DomainService } from "library/api/services/DomainService";

const columns: ColumnsType<Choice> = [
  {
    title: <Trans i18nKey="fields.response" />,
    dataIndex: "details",
    ellipsis: true,
  },
  {
    title: <Trans i18nKey="fields.level" />,
    dataIndex: ["level", "name"],
    responsive: ["lg"],
    render: (value) => <Tag color="magenta">{value}</Tag>,
  },
  {
    title: <Trans i18nKey="fields.criterion" />,
    dataIndex: ["criterion", "name"],
    ellipsis: true,
    responsive: ["lg"],
  },
];

export default function ChoiceCrud() {
  const domainService = new DomainService();
  const service = new ChoiceService();
  const { t } = useTranslation();

  const { results: domains, isLoading: domainsLoading } = useListAction({
    selectResults: (state) => state.domains.results,
    selectLoading: (state) => state.domains.isLoading,
    reducer: domainSlice,
    service: domainService,
  });

  return (
    <Card>
      <Tabs tabBarStyle={{ 
        // backgroundColor: '#ffffff'
      }} defaultActiveKey="1" tabPosition="left">
        {domains.map(
          (domain, key) => (
            <Tabs.TabPane destroyInactiveTabPane tab={domain.name} key={key}>
              <Crud<
                Choice, 
                ChoiceFormSchema, 
                ChoiceState
              >
                title={"Respuestas del Dominio " + domain.name}
                idSource="id"
                columns={columns}
                service={service}
                reducer={choiceSlice}
                selectLoading={(state) => state.choices.isLoading}
                selectResults={(state) => state.choices.results}
                createModal={({ visible, loading, onSave, onClose }) => (
                  <ChoiceForm
                    show={visible}
                    isLoading={loading}
                    onSave={onSave}
                    onHide={onClose}
                  />
                )}
                editModal={({ record, visible, loading, onClose, onSave }) => (
                  <ChoiceForm
                    show={visible}
                    isLoading={loading}
                    onSave={onSave}
                    onHide={onClose}
                    defaults={{
                      criterionId: record.criterion.id,
                      levelId: record.level.id,
                      details: record.details,
                    }}
                    isEdit
                  />
                )}
                detailModal={({ record, visible, onClose }) => (
                  <AppDrawer
                    title={record.level.name}
                    visible={visible}
                    onClose={onClose}
                  >
                    Choice Detail
                  </AppDrawer>
                )}
              />
            </Tabs.TabPane>
          )
        )}
      </Tabs>
    </Card>
  );
}
