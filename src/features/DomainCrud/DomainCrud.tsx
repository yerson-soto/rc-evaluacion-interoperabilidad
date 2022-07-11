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
import { useDomainList } from "../EvaluationInit/DomainList/useDomainList";

import { LockOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Domain } from 'library/models/Domain'


// const data = Array.from({
//   length: 23,
// }).map((_, i) => ({
//   href: "https://ant.design",
//   title: `ant design part ${i}`,
//   avatar: "https://joeschmoe.io/api/v1/random",
//   description:
//     "Ant Design, a design language for background applications, is refined by Ant UED Team.",
//   content:
//     "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
// }));

// export default function DomainCrud() {
//   const { domains } = useDomainList();
//   const navigate = useNavigate();

//   return (
//     <Space style={{ width: "100%" }} size="large" direction="vertical">
//       <PageHeader
//         style={{ padding: 0 }}
//         onBack={() => navigate("/")}
//         title="Evaluaciones"
//         subTitle="Lista de evaluaciones tomadas..."
//         extra={
//           <Button
//             type="primary"
//             size="large"
//             shape="circle"
//             icon={<UserOutlined />}
//           />
//         }
//       />

//       <Card
//         title="Filtrar Dominios"
//         extra={
//           <Button type="primary" htmlType="submit">
//             Aplicar
//           </Button>
//         }
//       >
//         <Form name="horizontal_login" layout="inline">
//           <Form.Item name="username">
//             <Input placeholder="Buscar" type="text" autoComplete="off" />
//           </Form.Item>
//           <Form.Item name="password">
//             <Input type="text" placeholder="Estado" autoComplete="off" />
//           </Form.Item>
//           <Form.Item name="password">
//             <Input type="text" placeholder="Por fecha" autoComplete="off" />
//           </Form.Item>
//           <Form.Item name="password">
//             <Input type="text" placeholder="Activo" autoComplete="off" />
//           </Form.Item>
//           <Form.Item name="password" style={{ marginRight: "auto" }}>
//             <Input type="text" placeholder="Acronimo" autoComplete="off" />
//           </Form.Item>
//         </Form>
//       </Card>
//       <Card title="Lista de Dominios">
//         <List
//           itemLayout="horizontal"
//           size="large"
//           pagination={{
//             onChange: (page) => {
//               console.log(page);
//             },
//             pageSize: 3,
//           }}
//           dataSource={domains}
//           footer={
//             <div>
//               <b>ant design</b> footer part
//             </div>
//           }
//           renderItem={(item) => (
//             <ListItem
//               key={item.id}
//               actions={[
//                 <Button>Editar</Button>,
//                 <Button danger>Eliminar</Button>,
//               ]}
//             >
//               <List.Item.Meta
//                 avatar={<Avatar />}
//                 title={<a>{item.name}</a>}
//                 description="Lorem ipsum dolor sit amet consectetura, excepturi qui iusto doloremque dicta quasi?"
//               />
//               Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//               Consequuntur voluptas ratione quam quia explicabo, architecto eius
//               incidunt dolor suscipit ab repellat. Vel, pariatur a animi
//               doloremque tenetur numquam nesciunt in.
//             </ListItem>
//           )}
//         />
//       </Card>
//     </Space>
//   );
// }

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

import AppDrawer from '../../library/components/AppDrawer/AppDrawer';
import { AddDomain } from "./AddDomain";
import { useCreateAction } from '../../library/hooks/useCreateAction';
import { domainSlice, DomainState } from '../../main/store/slices/domainSlice';
import { GetDomain, CreateDomain } from '../../library/api/dto/domain-dto';
import { AddDomainSchema } from './AddDomain/AddDomainSchema';
import { DomainService } from '../../library/api/services/DomainService';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  actions: React.ReactNode;
}

const domains: Domain[] = [
  {
    id: 1,
    name: "Organizacional",
    slug: 'organizacional'
  },
  {
    id: 2,
    name: "Semantico",
    slug: 'semantico'
  },
  {
    id: 3,
    name: "Politico Legal",
    slug: 'politico-legal'
  },
  {
    id: 4,
    name: "Semantico Legal",
    slug: 'semantico-legal'
  },
];


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
    render: (name) => <DetailAction text={name} />
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
          <EditAction />
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

      <Modal title="Basic Modal" visible={visible} onOk={() => { }} onCancel={onClose}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </React.Fragment>
  );
};


const EditAction = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        type="link"
        shape="round"
        icon={<EditOutlined />}
        onClick={showDrawer}
      ></Button>

   
      <AppDrawer
        title="Editar Dominio"
        placement="right"
        onClose={onClose}
        visible={visible}
        destroyOnClose
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </AppDrawer>
    </React.Fragment>
  );
};

const App: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [visible, setVisible] = useState(false);

  // const { domains, isLoading } = useDomainList();

  const { create, isLoading } = useCreateAction<Domain, DomainState, AddDomainSchema>({
    loadingSelector: (state) => state.domains.isLoading,
    service: DomainService,
    reducer: domainSlice
  });

  const domainsWithKey = domains.map((domain, key) => ({ key, ...domain }));

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

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
            <Button type="primary" shape="round" block icon={<PlusOutlined />} onClick={showDrawer}></Button>
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
          loading={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={domainsWithKey}
          onChange={onChange}
          sticky
          pagination={{
            pageSize: 25,
            style: {
              position: "sticky",
              bottom: 0,
            },
          }}
        />
      </Card>

      <AddDomain
        show={visible}
        isLoading={isLoading}
        onHide={closeDrawer}
        onSave={create}
      />
    </React.Fragment>
  );
};

export default App;
