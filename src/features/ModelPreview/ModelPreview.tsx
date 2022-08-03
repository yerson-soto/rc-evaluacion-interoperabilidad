import React from 'react'
import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table';
import { Domain } from 'library/models/Domain';
import { Trans } from 'react-i18next';

const columns: ColumnsType<Domain> = [
  {
    title: <Trans i18nKey="fields.domain" />,
    dataIndex: "name",
    ellipsis: true
  },
  {
    title: <Trans i18nKey="fields.slug" />,
    dataIndex: "slug",
    responsive: ["lg"],
  },
  {
    title: <Trans i18nKey="fields.domain_acronym" />,
    dataIndex: "acronym",
    responsive: ["lg"],
    render: (value) => <Tag color="#d46b08">{value}</Tag>,
  },
];

export default function ModelPreview() {
  return (
    <Table
      columns={columns}
      // dataSource={data}
      
    />
  )
}
