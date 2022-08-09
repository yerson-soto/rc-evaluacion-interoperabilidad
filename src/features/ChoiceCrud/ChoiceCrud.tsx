import React from "react";
import { ColumnsType } from "antd/lib/table";
import { SettingOutlined } from "@ant-design/icons";
import { Card, Collapse, Space, Tabs, Tag, Typography } from "antd";
import { Trans, useTranslation } from "react-i18next";
import { ChoiceFormSchema } from "./ChoiceForm/ChoiceFormSchema";
import { Choice } from "library/models/Choice";
import { ChoiceService } from "library/api/services/ChoiceService";
import { AppDrawer } from "library/components/AppDrawer";
import { Crud } from "features/Crud";
import { choiceSlice, ChoiceState } from "redux/slices/choiceSlice";
import { ChoiceForm } from "./ChoiceForm";

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
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

const domainColumns: ColumnsType<Domain> = [
  {
    title: "Dominio",
    dataIndex: "name",
    ellipsis: true,
    sorter: (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: "Slug",
    dataIndex: "slug",
    responsive: ["lg"],
  },
  {
    title: "Abreviatura",
    dataIndex: "acronym",
    responsive: ["lg"],
    render: (value) => <Tag color="#d46b08">{value}</Tag>,
  },
];

function mapTableRow<T>(record: T, key: number) {
  return {
    ...record,
    key,
  };
}

export default function ChoiceCrud() {
  const domainService = new DomainService();
  const choiceService = new ChoiceService();

  const { t } = useTranslation();

  const { results: domains, isLoading: domainsLoading } = useListAction({
    selectResults: (state) => state.domains.results,
    selectLoading: (state) => state.domains.isLoading,
    reducer: domainSlice,
    service: domainService,
  });

  return (
    <Space direction="vertical" size={30}>
      <Toolbar
        title={t("headings.choice_list")}
        actions={
          <CreateAction<Choice, ChoiceFormSchema, ChoiceState>
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
      {/* <Table
        columns={domainColumns}
        loading={domainsLoading}
        expandable={{
          expandedRowRender: (record) => <CriterionTable domain={record} />,
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        showHeader={false}
        dataSource={domains.map(mapTableRow)}
      /> */}

      <Card>
      <Tabs tabBarStyle={{
        // backgroundColor: '#ffffff'
      }} defaultActiveKey="1" tabPosition="left">
        {domains.map(
          (domain, key) => (
            <Tabs.TabPane destroyInactiveTabPane tab={domain.name} key={key}>
              <CriterionTable domain={domain} />
            </Tabs.TabPane>
          )
        )}
      </Tabs>
      </Card>
    </Space>
  );
}

const criterionColumns: ColumnsType<Criterion> = [
  {
    title: "Lineamientos",
    dataIndex: "lineaments",
    ellipsis: true,
    responsive: ["lg"],
    render: (lineaments: LightLineament[]) => {
      const total = lineaments.length;
      const showResponsiveTag = total > 2;
      const showLineaments = showResponsiveTag
        ? lineaments.slice(0, 2)
        : lineaments;

      return (
        <Space>
          {showLineaments.map((value) => (
            <Tag color="blue" key={value.id}>
              {value.nomenclature}
            </Tag>
          ))}

          {showResponsiveTag && <Tag color="blue" key="more">+ {total - 2}</Tag>}
        </Space>
      );
    },
  },
  {
    title: "Criterio",
    dataIndex: "name",
    ellipsis: true,
    // sorter: (a, b) => {
    //   if (a.name < b.name) { return -1; }
    //   if (a.name > b.name) { return 1; }
    //   return 0;
    // },
  },
  
];

function CriterionTable({ domain }: { domain: Domain }) {
  const { isLoading, criterions } = useCriterionList(domain.id);

  return (
    <Space direction="vertical" size={30}>
    <Table
      pagination={{
        size: 'small'
      }}
      columns={criterionColumns}
      loading={isLoading}

      dataSource={criterions.map(mapTableRow)}
      expandable={{
        expandedRowRender: (record) => <ChoiceTable criterion={record} />,
        rowExpandable: (record) => record.name !== "Not Expandable",
        indentSize: 50,
        
      }}
      showHeader={false}
      title={() => <h3>Lista de criterios del Dominio {domain.name}</h3>}
    />
    {/* <Collapse
      accordion
      bordered={false}
      defaultActiveKey={["1"]}
      expandIconPosition="end"
      className="site-collapse-custom-collapse"
    >
      {criterions.map((criterion) => (
        <Collapse.Panel 
          
          style={{
            backgroundColor: '#ffffff',
            padding: '12px 10px',
            borderBottomColor: '#f0f0f0'
          }}
          header={
            <Space>
            <Space>
              {criterion.lineaments.map((value) => (
                <Tag color="blue" key={value.id}>
                  {value.nomenclature}
                </Tag>
              ))}
            </Space>

            <Typography.Text>{criterion.name}</Typography.Text>
            </Space>
              
          } 
          key={criterion.id}
          
        >
          <AppBox style={{ marginLeft: 20, paddingLeft: 30, backgroundColor: "#fefefe", borderLeftColor: 'green', borderLeftWidth: 2, borderLeftStyle: 'solid' }}>
            <ChoiceTable criterion={criterion} />
          </AppBox>
        </Collapse.Panel>
      ))}
    </Collapse> */}
    </Space>
  );
}

const choiceColumns: ColumnsType<Choice> = [
  {
    title: "Respuesta",
    dataIndex: "details",
    ellipsis: true,
  },
  {
    title: "Nivel",
    dataIndex: ["level", "name"],
    responsive: ["lg"],
    render: (value) => <Tag color="magenta">{value}</Tag>,
  },
];

function ChoiceTable({ criterion }: { criterion: Criterion }) {
  const { isLoading, choices } = useChoiceList(criterion.id);

  return (
    // <Table
    //   pagination={{
    //     size: "small",
    //   }}
    //   columns={choiceColumns}
    //   loading={isLoading}
    //   dataSource={choices.map(mapTableRow)}
    //   showHeader={false}
    // />
    <Form size="large" name="dynamic_form_nest_item" autoComplete="off">
      <Form.List initialValue={['', '', '', '', '',]} name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Agregar respuesta
                  </Button>
                </Form.Item>
              </Space>
            ))}
          </>
        )}
      </Form.List>
    </Form>
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
