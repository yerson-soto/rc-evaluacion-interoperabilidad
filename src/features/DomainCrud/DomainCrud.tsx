import Modal from "antd/lib/modal/Modal";
import { ColumnsType } from "antd/lib/table";
import { Crud } from "features/Crud";
import { DomainService } from "library/api/services/DomainService";
import { Domain } from "library/models/Domain";
import { domainSlice, DomainState } from "main/store/slices/domainSlice";
import { DomainForm } from "./DomainForm";
import { DomainFormSchema } from "./DomainForm/DomainFormSchema";

// import { LockOutlined, UserOutlined, EyeOutlined } from "@ant-design/icons";
// import { Form, Input } from "antd";
// import { useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// import { Domain } from "library/models/Domain";

// import React, { useState } from "react";
// import { Button, Space, Table } from "antd";
// import type { ColumnsType, TableProps } from "antd/lib/table";
// import type { TableRowSelection } from "antd/lib/table/interface";
// import {
//   EditOutlined,
//   DeleteOutlined,
//   PlusOutlined,
//   ExportOutlined,
// } from "@ant-design/icons";
// import { Box } from "library/components/Box";

// import AppDrawer from "library/components/AppDrawer/AppDrawer";
// import { useCreateAction } from "library/hooks/useCreateAction";
// import { domainSlice, DomainState } from "main/store/slices/domainSlice";
// import { DomainService } from "library/api/services/DomainService";
// import { DomainForm } from "features/DomainCrud/DomainForm";
// import { CrudRepository } from "library/api/repositories/CrudRepository";
// import { DomainFormSchema } from "features/DomainCrud/DomainForm/DomainFormSchema";
// import { useToogleAction } from "library/components/Crud/useToggleAction";
// import { useListAction } from "library/hooks/useListAction";
// import { useEditAction } from "library/hooks/useEditAction";
// import { useDeleteAction } from "library/hooks/useDeleteAction";
// import CrudHeader from 'library/components/Crud/CrudHeader/CrudHeader';

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
//   actions: React.ReactNode;
// }

// // const domains: Domain[] = [
// //   {
// //     id: 1,
// //     name: "Organizacional",
// //     slug: "organizacional",
// //   },
// //   {
// //     id: 2,
// //     name: "Semantico",
// //     slug: "semantico",
// //   },
// //   {
// //     id: 3,
// //     name: "Politico Legal",
// //     slug: "politico-legal",
// //   },
// //   {
// //     id: 4,
// //     name: "Semantico Legal",
// //     slug: "semantico-legal",
// //   },
// // ];

// const columns: ColumnsType<Domain> = [
//   // {
//   //   title: "#",
//   //   dataIndex: "id",
//   //   defaultSortOrder: "descend",
//   //   responsive: ["lg"],
//   //   sorter: (a, b) => a.id - b.id,
//   // },
//   {
//     title: "Nombre",
//     dataIndex: "name",
//     ellipsis: true,
//     filters: [
//       {
//         text: "Edward",
//         value: "Edward",
//       },
//       {
//         text: "Jim",
//         value: "Jim",
//       },
//     ],
//     // specify the condition of filtering result
//     // here is that finding the name started with `value`
//     onFilter: (value, record) => record.name.indexOf(value as string) === 0,
//     sorter: (a, b) => a.name.length - b.name.length,
//     render: (name) => <DetailAction text={name} />,
//     // sortDirections: ["descend"],
//   },
//   {
//     title: "Slug",
//     dataIndex: "slug",
//     responsive: ["lg"],
//     filters: [
//       {
//         text: "London",
//         value: "London",
//       },
//       {
//         text: "New York",
//         value: "New York",
//       },
//     ],
//     // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
//   },
//   {
//     title: "Abreviatura",
//     dataIndex: "acronym",
//     responsive: ["lg"],
//     // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
//   },
//   {
//     title: "Acciones",
//     dataIndex: "id",
//     key: "action-group",
//     render(id, record) {
//       return (
//         <Space key={id}>
//           {/* <EyeOutlined /> */}
//           <EditAction domain={record} />
//           <DeleteAction domain={record} />
//         </Space>
//       );
//     },
//   },
// ];

// const DeleteAction = ({ domain }: { domain: Domain }) => {
//   const { deleteOne, isLoading } = useDeleteAction<
//     Domain,
//     DomainState,
//     DomainFormSchema
//   >({
//     loadingSelector: (state) => state.domains.isLoading,
//     service: DomainService,
//     reducer: domainSlice,
//   });

//   return (
//     <Popconfirm
//       placement="right"
//       title="Are you sure？"
//       okText="Yes"
//       cancelText="No"
//       onConfirm={() => deleteOne(domain.id)}
//     >
//       <Button
//         loading={isLoading}
//         size="small"
//         type="link"
//         shape="round"
//         icon={<DeleteOutlined />}
//         danger
//       ></Button>
//     </Popconfirm>
//   );
// };

// const DetailAction = ({ text }: { text: string }) => {
//   const [visible, setVisible] = useState(false);

//   const showModal = () => {
//     setVisible(true);
//   };

//   const onClose = () => {
//     setVisible(false);
//   };

//   return (
//     <React.Fragment>
//       <a onClick={showModal}>{text}</a>
//       {/* <Button
//         size="small"
//         type="link"
//         shape="round"
//         icon={<EyeOutlined />}
//         onClick={showModal}
//       ></Button> */}

//       <Modal
//         title="Basic Modal"
//         visible={visible}
//         onOk={() => {}}
//         onCancel={onClose}
//       >
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//         <p>Some contents...</p>
//       </Modal>
//     </React.Fragment>
//   );
// };

// const EditAction = ({ domain }: { domain: Domain }) => {
//   const { isOpen, onOpen, onCloseEnd } = useToogleAction<Domain>({
//     action: "edit",
//     keyFrom: "id",
//     state: domain,
//   });

//   const { editOne, isLoading } = useEditAction<
//     Domain,
//     DomainState,
//     DomainFormSchema
//   >({
//     loadingSelector: (state) => state.domains.isLoading,
//     service: DomainService,
//     reducer: domainSlice,
//   });

//   return (
//     <React.Fragment>
//       <Button
//         size="small"
//         type="link"
//         shape="round"
//         icon={<EditOutlined />}
//         onClick={onOpen}
//       ></Button>

//       <DomainForm
//         show={isOpen}
//         isLoading={isLoading}
//         onHide={onCloseEnd}
//         onSave={async (schema) => await editOne(domain.id, schema)}
//         defaults={domain}
//         isEdit
//       />
//     </React.Fragment>
//   );
// };

// // interface CreateActionProps {
// //   renderModal: (visible: boolean, isLoading: boolean, onClose: () => void, onCreate: () => void);
// // }

// const CreateAction = () => {
//   const { isOpen, onOpen, onCloseEnd } = useToogleAction<Domain>({
//     action: "create",
//   });

//   const { createOne, isLoading } = useCreateAction<
//     Domain,
//     DomainState,
//     DomainFormSchema
//   >({
//     loadingSelector: (state) => state.domains.isLoading,
//     service: DomainService,
//     reducer: domainSlice,
//   });

//   return (
//     <React.Fragment>
//       <Button
//         type="primary"
//         shape="round"
//         block
//         icon={<PlusOutlined />}
//         onClick={onOpen}
//       ></Button>

//       <DomainForm
//         show={isOpen}
//         isLoading={isLoading}
//         onHide={onCloseEnd}
//         onSave={createOne}
//       />
//     </React.Fragment>
//   );
// };

// export default function Crud<
//   T,
//   FormSchema,
//   Service extends new () => CrudRepository<T, FormSchema>
// >() {
//   const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

//   const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//     console.log("selectedRowKeys changed: ", selectedRowKeys);
//     setSelectedRowKeys(newSelectedRowKeys);
//   };

//   const { isLoading, results } = useListAction<
//     Domain,
//     DomainState,
//     DomainFormSchema
//   >({
//     loadingSelector: (state) => state.domains.isLoading,
//     resultsSelector: (state) => state.domains.results,
//     service: DomainService,
//     reducer: domainSlice,
//   });

//   const domainsWithKey = results.map((domain, key) => ({ key, ...domain }));

//   const onChange: TableProps<Domain>["onChange"] = (
//     pagination,
//     filters,
//     sorter,
//     extra
//   ) => {
//     console.log("params", pagination, filters, sorter, extra);
//   };

//   return (
//     <React.Fragment>
//       <CrudHeader />

//       <Table
//         loading={isLoading}
//         // rowSelection={rowSelection}
//         columns={columns}
//         dataSource={domainsWithKey}
//         onChange={onChange}
//         sticky
//         pagination={{
//           pageSize: 10,
//           style: {
//             position: "sticky",
//             bottom: 0,
//           },
//         }}
//       />
//     </React.Fragment>
//   );
// }

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
    // render: (name) => <DetailAction text={name} />,
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
    title: "Abreviatura",
    dataIndex: "acronym",
    responsive: ["lg"],
    // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  },
];

export default function DomainCrud() {
  return (
    <Crud<Domain, DomainFormSchema, DomainState>
      title="domain.list"
      idSource="id"
      columns={columns}
      service={DomainService}
      reducer={domainSlice}
      loadingSelector={(state) => state.domains.isLoading}
      resultsSelector={(state) => state.domains.results}
      toggledActions={{
        renderCreate: ({ visible, loading, onSave, onClose }) => (
          <DomainForm
            show={visible}
            isLoading={loading}
            onSave={onSave}
            onHide={onClose}
          />
        ),
        renderEdit: ({ record, visible, loading, onClose, onSave }) => (
          <DomainForm
            show={visible}
            isLoading={loading}
            onSave={onSave}
            onHide={onClose}
            defaults={record}
            isEdit
          />
        ),
        renderDetail: ({ record, visible, onClose }) => (
          <Modal title={record.name} visible={visible} onCancel={onClose}>
            Domain Detail
          </Modal>
        ),
      }}
    />
  );
}
