import React, { useState } from "react";
import { Table, Button, Space, Typography, Avatar, Card, Row, Col, PageHeader } from "antd";
import type { TableProps } from "antd";
import type {
  ColumnsType,
  FilterValue,
  SorterResult,
} from "antd/lib/table/interface";
import { CustomCard } from "library/components/CustomCard";

import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useEvaluationList } from './useEvaluationList';
import { Evaluation } from "library/models/Evaluation";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "6",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "7",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "8",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
  {
    key: "9",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "10",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

export default function EvaluationList() {
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState<SorterResult<Evaluation>>({});
  const navigate = useNavigate();

  const { isLoading, evaluations } = useEvaluationList();

  const handleChange: TableProps<Evaluation>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<Evaluation>);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const columns: ColumnsType<Evaluation> = [
    {
      title: "UUID",
      dataIndex: "uuid",
      key: "uuid",
      // filters: [
      //   { text: "Joe", value: "Joe" },
      //   { text: "Jim", value: "Jim" },
      // ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record) => record.dateCreated.includes(value),
      sorter: (a, b) => a.dateCreated.length - b.dateCreated.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Organismo",
      dataIndex: "organizationId",
      key: "organizationId",
      sorter: (a, b) => a.organizationId - b.organizationId,
      sortOrder: sortedInfo.columnKey === "organizationId" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Fecha de Creacion",
      dataIndex: "dateCreated",
      key: "dateCreated",
      filters: [
        { text: "2022-05-22", value: "2022-05-22" },
        { text: "2022-05-22", value: "2022-05-22" },
      ],
      filteredValue: filteredInfo.address || null,
      ellipsis: true,
    },
  ];

  return (
    <Space direction="vertical" size="large">
      <PageHeader
        style={{ padding: 0 }}
        onBack={() => navigate("/evaluaciones")}
        title="Evaluaciones"
        subTitle="Lista de evaluaciones tomadas..."
        // extra={[
        //   <Button key="2">Crear</Button>,
        //   <Button key="1" type="primary">
        //     Editar
        //   </Button>,
        // ]}
      />
      
      <CustomCard
        bordered
        // actions={[
        //   <Link to="/evaluaciones/abcd/complete">
        //     <SettingOutlined key="setting" />
        //   </Link>,
        //   <EditOutlined key="edit" />,
        //   <Button>Iniciar</Button>,
        // ]}
      >
        <Row align="middle" gutter={[5, 15]}>
          <Col xs={24} md={20} lg={22}>
            <Typography.Title level={4}>Nueva evaluación</Typography.Title>

            <Typography.Text>Enviada el 2022 de mayo de 2022</Typography.Text>
          </Col>

          <Col flex="auto">
            <Button
              style={{ width: "100%" }}
              type="primary"
              icon={<ArrowRightOutlined />}
              size="large"
              onClick={() => navigate('/evaluaciones/abcd/complete')}
            >
              Iniciar
            </Button>
          </Col>
        </Row>

        {/* <Button type="primary" color="green">Iniciar</Button> */}
        {/* 
        <Card.Meta
          
     
      title="Nueva Evaluacion"
      description="Enviada el 2022 de mayo de 2022"
    /> */}
      </CustomCard>
      <Space style={{ marginBottom: 16 }} wrap>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={evaluations} onChange={handleChange} />
    </Space>
  );
}
