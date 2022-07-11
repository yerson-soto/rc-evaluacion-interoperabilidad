import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Drawer,
  List,
  Modal,
  PageHeader,
  Popconfirm,
  Typography,
} from "antd";
import { ListItem } from "library/components/ListItem";

import { LockOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Domain } from "library/models/Domain";

import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/lib/table";
import type { TableRowSelection } from "antd/lib/table/interface";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Box } from "library/components/Box";

import AppDrawer from "library/components/AppDrawer/AppDrawer";
import { useCreateAction } from "library/hooks/useCreateAction";
import { domainSlice, DomainState } from "main/store/slices/domainSlice";
import { DomainService } from "library/api/services/DomainService";
import { AddDomain } from "features/DomainCrud/AddDomain";
import { CrudRepository } from "../../api/repositories/CrudRepository";
import { AddDomainSchema } from "features/DomainCrud/AddDomain/AddDomainSchema";
import { useToogleAction } from "./useToggleAction";
import { useDomainList } from "features/EvaluationInit/DomainList/useDomainList";
import { useListAction } from "../../hooks/useListAction";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  actions: React.ReactNode;
}

// const domains: Domain[] = [
//   {
//     id: 1,
//     name: "Organizacional",
//     slug: "organizacional",
//   },
//   {
//     id: 2,
//     name: "Semantico",
//     slug: "semantico",
//   },
//   {
//     id: 3,
//     name: "Politico Legal",
//     slug: "politico-legal",
//   },
//   {
//     id: 4,
//     name: "Semantico Legal",
//     slug: "semantico-legal",
//   },
// ];

const columns: ColumnsType<Domain> = [
  // {
  //   title: "#",
  //   dataIndex: "id",
  //   defaultSortOrder: "descend",
  //   responsive: ["lg"],
  //   sorter: (a, b) => a.id - b.id,
  // },
  {
    title: "Nombre",
    dataIndex: "name",
    ellipsis: true,
    filters: [
      {
        text: "Edward",
        value: "Edward",
      },
      {
        text: "Jim",
        value: "Jim",
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    render: (name) => <DetailAction text={name} />,
    // sortDirections: ["descend"],
  },
  {
    title: "Slug",
    dataIndex: "slug",
    responsive: ["lg"],
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "action-group",
    render(_, record) {
      return (
        <Space>
          {/* <EyeOutlined /> */}
          <EditAction domain={record} />
          <DeleteAction />
        </Space>
      );
    },
  },
];

const DeleteAction = () => (
  <Popconfirm
    placement="right"
    title="Are you sure？"
    okText="Yes"
    cancelText="No"
  >
    <Button
      size="small"
      type="link"
      shape="round"
      icon={<DeleteOutlined />}
      danger
    ></Button>
  </Popconfirm>
);

const DetailAction = ({ text }: { text: string }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      <a onClick={showModal}>{text}</a>
      {/* <Button
        size="small"
        type="link"
        shape="round"
        icon={<EyeOutlined />}
        onClick={showModal}
      ></Button> */}

      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={() => {}}
        onCancel={onClose}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </React.Fragment>
  );
};

const EditAction = ({ domain }: { domain: Domain }) => {
  const { isOpen, onOpen, onCloseStart, onCloseEnd } = useToogleAction<Domain>({
    action: "edit",
    keyFrom: "id",
    state: domain,
  });

  // const { create, isLoading } = useCreateAction<
  //   Domain,
  //   DomainState,
  //   AddDomainSchema
  // >({
  //   loadingSelector: (state) => state.domains.isLoading,
  //   service: DomainService,
  //   reducer: domainSlice,
  // });

  return (
    <React.Fragment>
      <Button
        size="small"
        type="link"
        shape="round"
        icon={<EditOutlined />}
        onClick={onOpen}
      ></Button>

      <AddDomain
        show={isOpen}
        isLoading={false}
        onHide={onCloseEnd}
        onSave={() => {}}
        defaults={domain}
      />
    </React.Fragment>
  );
};

// interface CreateActionProps {
//   renderModal: (visible: boolean, isLoading: boolean, onClose: () => void, onCreate: () => void);
// }

const CreateAction = () => {
  const { isOpen, onOpen, onCloseEnd } = useToogleAction<Domain>({
    action: "create",
  });

  const { create, isLoading } = useCreateAction<
    Domain,
    DomainState,
    AddDomainSchema
  >({
    loadingSelector: (state) => state.domains.isLoading,
    service: DomainService,
    reducer: domainSlice,
  });

  return (
    <React.Fragment>
      <Button
        type="primary"
        shape="round"
        block
        icon={<PlusOutlined />}
        onClick={onOpen}
      ></Button>

      <AddDomain
        show={isOpen}
        isLoading={isLoading}
        onHide={onCloseEnd}
        onSave={create}
      />
    </React.Fragment>
  );
};

export default function Crud<
  T,
  FormSchema,
  Service extends new () => CrudRepository<T, FormSchema>
>() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // const { domains, isLoading } = useDomainList();

  
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  
  const { isLoading, results } = useListAction<Domain, DomainState, AddDomainSchema>({
    loadingSelector: (state) => state.domains.isLoading,
    resultsSelector: (state) => state.domains.results,
    service: DomainService,
    reducer: domainSlice,
  });
  
  const domainsWithKey = results.map((domain, key) => ({ key, ...domain }));
  
  const onChange: TableProps<Domain>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const rowSelection: TableRowSelection<Domain> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <Card style={{ marginBottom: 30 }}>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              display: "inline-block",
              flex: "1 1",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              margin: 0,
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            Lista de Dominios
          </Box>

          <Space direction="horizontal">
            <Button shape="round" block icon={<ExportOutlined />}></Button>
            <CreateAction />
          </Space>
        </Box>
      </Card>

      {/* <Card
        style={{
          marginBottom: 30,
        }}
      >
        <Form name="horizontal_login" layout="inline">
          <Form.Item name="username">
            <Input placeholder="Buscar" type="text" autoComplete="off" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="text" placeholder="Estado" autoComplete="off" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="text" placeholder="Por fecha" autoComplete="off" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="text" placeholder="Activo" autoComplete="off" />
          </Form.Item>
          <Form.Item name="password" style={{ marginRight: "auto" }}>
            <Input type="text" placeholder="Acronimo" autoComplete="off" />
          </Form.Item>
          <Form.Item style={{ margin: 0 }}>
            <Button type="primary" htmlType="submit">
              Filtrar
            </Button>
          </Form.Item>
        </Form>
      </Card> */}

      <Card
        bodyStyle={{
          paddingLeft: 16,
          paddingTop: 16,
          paddingRight: 16,
          paddingBottom: 16,
        }}
      >
        <Table
          loading={isLoading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={domainsWithKey}
          onChange={onChange}
          sticky
          pagination={{
            pageSize: 10,
            style: {
              position: "sticky",
              bottom: 0,
            },
          }}
        />
      </Card>
    </React.Fragment>
  );
}
