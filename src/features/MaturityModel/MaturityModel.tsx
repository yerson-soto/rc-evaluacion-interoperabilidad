import React from "react";
import { ColumnsType } from "antd/lib/table";
import { SettingOutlined } from "@ant-design/icons";
import { Badge, Card, Collapse, Grid, Space, Tabs, Tag, Typography } from "antd";
import { Trans, useTranslation } from "react-i18next";
import { ChoiceFormSchema } from "features/ChoiceCrud/ChoiceForm/ChoiceFormSchema";
import { Choice } from "library/models/Choice";
import { ChoiceService } from "library/api/services/ChoiceService";
import { AppDrawer } from "library/components/AppDrawer";
import { Crud } from "features/Crud";
import { choiceSlice, ChoiceState } from "redux/slices/choiceSlice";
import { ChoiceForm } from "features/ChoiceCrud/ChoiceForm";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useListAction } from "features/Crud/useListAction";
import { domainSlice } from "redux/slices/domainSlice";
import { DomainService } from "library/api/services/DomainService";
import { Toolbar } from "library/components/Toolbar";
import { CreateAction } from "features/Crud/CreateAction";

import { Table } from "antd";

import { Domain } from "library/models/Domain";
import { Criterion } from "library/models/Criterion";
import { useCriterionList } from "features/EvaluationInit/Questionary/useCriterionList";
import { LightLineament } from "library/models/Lineament";
import { useChoiceList } from "features/EvaluationInit/QuestionItem/useChoiceList";
import { AppBox } from "library/components/AppBox";
import { LevelService } from "library/api/services/LevelService";
import { Level } from "library/models/Level";
import { levelSlice, LevelState } from "redux/slices/levelSlice";
import { DomainTabs } from "./DomainTabs";

export default function ChoiceCrud() {
  const domainService = new DomainService();
  const choiceService = new ChoiceService();

  const { t } = useTranslation();

  const { lg } = Grid.useBreakpoint();

  const { results: domains, isLoading: domainsLoading } = useListAction({
    selectResults: (state) => state.domains.results,
    selectLoading: (state) => state.domains.isLoading,
    reducer: domainSlice,
    service: domainService,
  });

  return (
    <Space direction="vertical" size={30} style={{ width: "100%" }}>
      <Toolbar
        title={t("headings.choice_list")}
        actions={
          <CreateAction<Choice, ChoiceFormSchema, ChoiceState>
          toggleKey="create-choice"
            reducer={choiceSlice}
            service={choiceService}
            selectLoading={(state) => state.auth.isLoading}
            render={({ visible, loading, onClose, onSave }) => (
              <ChoiceForm
                show={visible}
                isLoading={loading}
                onHide={onClose}
                onSave={onSave}
              />
            )}
          />
        }
      />
      <Card>
        <DomainTabs />
      </Card>
    </Space>
  );
}

function CriterionPanel({ domain }: { domain: Domain }) {
  const { isLoading, criterions } = useCriterionList(domain.id);

  return (
    <Collapse
      accordion
      bordered={false}
      defaultActiveKey={["1"]}
      // expandIconPosition="end"
      expandIcon={(props) => <PlusOutlined />}
    >
      {criterions.map((criterion) => (
        <Collapse.Panel
          style={{
            backgroundColor: "#ffffff",
            padding: "10px",
            borderBottomColor: "#f0f0f0",
          }}
          header={
            <Space>
              <Typography.Text>{criterion.name}</Typography.Text>

              <Space>
                {criterion.lineaments.map((value) => (
                  <Tag color="blue" key={value.id}>
                    {value.nomenclature}
                  </Tag>
                ))}
              </Space>
            </Space>
          }
          key={criterion.id}
        >
          <AppBox
            style={{
              marginLeft: 20,
              padding: "24px",
              backgroundColor: "#f3f3f3",
              // borderLeftColor: "green",
              // borderLeftWidth: 2,
              // borderLeftStyle: "solid"
            }}
          >
            <ChoiceTable criterion={criterion} />
          </AppBox>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}

function ChoiceTable({ criterion }: { criterion: Criterion }) {
  const { isLoading, choices } = useChoiceList(criterion.id);
  const levelService = new LevelService();

  const { results: levels } = useListAction<Level, LevelState>({
    selectLoading: (state) => state.levels.isLoading,
    selectResults: (state) => state.levels.results,
    reducer: levelSlice,
    service: levelService,
  });

  return (
    <Space direction="vertical" size={15}>
      {levels.map((level) => (
        <Space key={level.id} align="center" size="large">
          {/* <Tag style={{ fontSize: '16px', padding: '5px 10px' }} color="yellow">Nivel {level.value}</Tag> */}

          <Card
            size="small"
            style={{ width: "150px", textAlign: "center", fontSize: "16pxc" }}
            bodyStyle={{ padding: "8px 15px" }}
          >
            Nivel {level.value}
          </Card>

          <Button
            danger={![1, 3].includes(level.value)}
            type="dashed"
            size="large"
            icon={<PlusOutlined />}
            style={{ maxWidth: '100%' }}
          >
            {[1, 3].includes(level.value) ? (
              
                "La entidad ha iniciado su proceso de implementación de los lineamientos del Marco de Interoperabilidad."
              
            ) : (
              "Agregar respuesta"
            )}
          </Button>
        </Space>
      ))}
    </Space>
  );
}

// const columns: ColumnsType<Choice> = [
//   {
//     title: <Trans i18nKey="fields.response" />,
//     dataIndex: "details",
//     ellipsis: true,
//   },
//   {
//     title: <Trans i18nKey="fields.level" />,
//     dataIndex: ["level", "name"],
//     responsive: ["lg"],
//     render: (value) => <Tag color="magenta">{value}</Tag>,
//   },
//   {
//     title: <Trans i18nKey="fields.criterion" />,
//     dataIndex: ["criterion", "name"],
//     ellipsis: true,
//     responsive: ["lg"],
//   },
// ];

// export default function ChoiceCrud() {
//   const domainService = new DomainService();
//   const choiceService = new ChoiceService();
//   const { t } = useTranslation();

//   const { results: domains, isLoading: domainsLoading } = useListAction({
//     selectResults: (state) => state.domains.results,
//     selectLoading: (state) => state.domains.isLoading,
//     reducer: domainSlice,
//     service: domainService,
//   });

//   return (
//     <Card>
//       <Tabs tabBarStyle={{
//         // backgroundColor: '#ffffff'
//       }} defaultActiveKey="1" tabPosition="left">
//         {domains.map(
//           (domain, key) => (
//             <Tabs.TabPane destroyInactiveTabPane tab={domain.name} key={key}>
//               <Crud<
//                 Choice,
//                 ChoiceFormSchema,
//                 ChoiceState
//               >
//                 title={"Respuestas del Dominio " + domain.name}
//                 idSource="id"
//                 columns={columns}
//                 service={choiceService}
//                 reducer={choiceSlice}
//                 selectLoading={(state) => state.choices.isLoading}
//                 selectResults={(state) => state.choices.results}
//                 createModal={({ visible, loading, onSave, onClose }) => (
//                   <ChoiceForm
//                     show={visible}
//                     isLoading={loading}
//                     onSave={onSave}
//                     onHide={onClose}
//                   />
//                 )}
//                 editModal={({ record, visible, loading, onClose, onSave }) => (
//                   <ChoiceForm
//                     show={visible}
//                     isLoading={loading}
//                     onSave={onSave}
//                     onHide={onClose}
//                     defaults={{
//                       criterionId: record.criterion.id,
//                       levelId: record.level.id,
//                       details: record.details,
//                       isEvidenceRequired: record.isEvidenceRequired,
//                       requiredEvidences: record.requiredEvidences
//                     }}
//                     isEdit
//                   />
//                 )}
//                 detailModal={({ record, visible, onClose }) => (
//                   <AppDrawer
//                     title={record.level.name}
//                     visible={visible}
//                     onClose={onClose}
//                   >
//                     Choice Detail
//                   </AppDrawer>
//                 )}
//               />
//             </Tabs.TabPane>
//           )
//         )}
//       </Tabs>
//     </Card>
//   );
// }
