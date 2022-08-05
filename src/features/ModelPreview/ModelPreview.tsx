import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useListAction } from "features/Crud/useListAction";
import { DomainService } from "library/api/services/DomainService";
import { domainSlice } from "redux/slices/domainSlice";
import { Domain } from "library/models/Domain";
import { Criterion } from "library/models/Criterion";
import { useCriterionList } from "features/EvaluationInit/Questionary/useCriterionList";
import { LightLineament } from "library/models/Lineament";
import { Choice } from 'library/models/Choice';
import { useChoiceList } from 'features/EvaluationInit/QuestionItem/useChoiceList';

const domainColumns: ColumnsType<Domain> = [
  {
    title: "Dominio",
    dataIndex: "name",
    ellipsis: true,
    sorter: (a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
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

export default function App() {
  const domainService = new DomainService();

  const { results: domains, isLoading: domainsLoading } = useListAction({
    selectResults: (state) => state.domains.results,
    selectLoading: (state) => state.domains.isLoading,
    reducer: domainSlice,
    service: domainService,
  });

  return (
    <Table
      columns={domainColumns}
      loading={domainsLoading}
      style={{
        borderLeft: '2px solid #5d98eb'
      }}
      expandable={{
        expandedRowRender: (record) => <CriterionTable domain={record} />,
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={domains.map(mapTableRow)}
    />
  );
}

const criterionColumns: ColumnsType<Criterion> = [
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
            <Tag color="magenta" key={value.id}>{value.nomenclature}</Tag>
          ))}

          {showResponsiveTag && <Tag key="more">+ {total - 2}</Tag>}
        </Space>
      );
    },
  },
];

function CriterionTable({ domain }: { domain: Domain }) {
  const { isLoading, criterions } = useCriterionList(domain.id);

  return (
    <Table
      pagination={{
        size: 'small'
      }}
      columns={criterionColumns}
      loading={isLoading}
      style={{
        borderLeft: '2px solid #e56060'
      }}
      
      dataSource={criterions.map(mapTableRow)}
      expandable={{
        expandedRowRender: (record) => <ChoiceTable criterion={record} />,
        rowExpandable: (record) => record.name !== "Not Expandable",
        indentSize: 50
      }}
      showHeader={false}
    />
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
  }
];


function ChoiceTable({ criterion }: { criterion: Criterion }) {
  const { isLoading, choices } = useChoiceList(criterion.id);

  return (
    <Table
    pagination={{
      size: 'small'
    }}
      columns={choiceColumns}
      loading={isLoading}
      style={{
        borderLeft: '2px solid #65d585',
        marginLeft: '20px'
      }}
      dataSource={choices.map(mapTableRow)}
      showHeader={false}
    />
  );
}
