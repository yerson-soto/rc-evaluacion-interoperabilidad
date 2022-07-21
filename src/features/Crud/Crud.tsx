import React from "react";
import { Table, Space, Card, Button } from "antd";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { CrudReducer } from "library/common/interfaces";
import { RootState } from "redux/types";
import { RenderDetail } from "./DetailAction";
import { RenderEdit } from "./EditAction";
import { CreateAction, RenderCreate } from "./CreateAction";
import { Box } from "library/components/Box";
import { ExportOutlined } from "@ant-design/icons";
import { useCrud } from "./useCrud";
import type { ColumnsType } from "antd/lib/table";

import classes from "./Crud.module.css";

interface CrudProps<T, FormSchema> {
  title: string;
  columns: ColumnsType<T>;
  idSource: keyof T;
  service: CrudRepository<T, FormSchema>;
  reducer: CrudReducer<T>;

  createModal: (args: RenderCreate<FormSchema>) => React.ReactNode;
  editModal: (args: RenderEdit<T, FormSchema>) => React.ReactNode;
  detailModal: (args: RenderDetail<T>) => React.ReactNode;
  selectLoading: (state: RootState) => boolean;
  selectResults: (state: RootState) => T[];
}

export default function Crud<T, FormSchema>(props: CrudProps<T, FormSchema>) {
  const {
    title,
    columns,
    idSource,
    service,
    reducer,
    selectLoading,
    selectResults,
    createModal,
    editModal,
    detailModal,
  } = props;

  const { results, isLoading, onChange, actionColumns, rowSelection } = useCrud<
    T,
    FormSchema
  >({
    idSource,
    service,
    reducer,
    editModal,
    detailModal,
    selectLoading,
    selectResults,
  });

  return (
    <React.Fragment>
      <Card style={{ marginBottom: 30 }}>
        <Box className={classes.header}>
          <Box className={classes.title}>{title}</Box>

          <Space direction="horizontal">
            {/* <Button shape="round" icon={<ExportOutlined />} block /> */}
            <CreateAction<T, FormSchema>
              service={service}
              reducer={reducer}
              render={createModal}
              selectLoading={selectLoading}
            />
          </Space>
        </Box>
      </Card>

      <Table<any>
        loading={isLoading}
        rowSelection={rowSelection}
        columns={[...columns, ...actionColumns]}
        dataSource={results}
        onChange={onChange}
        pagination={{
          pageSize: 10,
          style: {
            position: "sticky",
            bottom: 0,
          },
        }}
        sticky
      />
    </React.Fragment>
  );
}
