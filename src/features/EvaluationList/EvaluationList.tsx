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
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const navigate = useNavigate();

  const handleChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as SorterResult<DataType>);
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

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value: any, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value: any, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
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
      {/* <Table columns={columns} dataSource={data} onChange={handleChange} /> */}
    </Space>
  );
}
