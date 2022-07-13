import React from "react";
import { Table, Space, Card, Button } from "antd";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { CrudCaseReducers, CrudState } from "library/common/interfaces";
import { useListAction } from "library/hooks/useListAction";
import { useEditAction } from "library/hooks/useEditAction";
import { useDeleteAction } from "library/hooks/useDeleteAction";
import { Slice } from "@reduxjs/toolkit";
import { RootState } from "main/store";
import { DetailAction, RenderDetail } from "./DetailAction";
import { EditAction, RenderEdit } from "./EditAction";
import { DeleteAction } from "./DeleteAction";
import { CreateAction, RenderCreate } from "./CreateAction";
import { Box } from "library/components/Box";
import { useCreateAction } from "../../library/hooks/useCreateAction";
import { ExportOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from "antd/lib/table";
import classes from "./Crud.module.css";

interface ActionConfig<T, FormSchema> {
  renderCreate: (args: RenderCreate<FormSchema>) => React.ReactNode;
  renderEdit: (args: RenderEdit<T, FormSchema>) => React.ReactNode;
  renderDetail: (args: RenderDetail<T>) => React.ReactNode;
}

interface CrudProps<T, FormSchema, State extends CrudState<T>> {
  title: string;
  columns: ColumnsType<T>;
  idSource: keyof T;
  service: new () => CrudRepository<T, FormSchema>;
  reducer: Slice<State, CrudCaseReducers<T, State>>;
  toggledActions: ActionConfig<T, FormSchema>;

  loadingSelector: (state: RootState) => boolean;
  resultsSelector: (state: RootState) => T[];
}

export default function Crud<T, FormSchema, State extends CrudState<T>>(
  props: CrudProps<T, FormSchema, State>
) {
  const {
    title,
    columns,
    idSource,
    service,
    reducer,
    loadingSelector,
    resultsSelector,
    toggledActions,
  } = props;

  const { renderCreate } = toggledActions;

  const commonActionArgs = {
    loadingSelector,
    service,
    reducer,
  };

  const { results, isLoading } = useListAction<T, State>({
    ...commonActionArgs,
    resultsSelector,
  });

  const { deleteOne, isLoading: isDeleting } = useDeleteAction<T, State>({
    ...commonActionArgs,
  });

  const { editOne, isLoading: isEditing } = useEditAction<T, State, FormSchema>(
    {
      ...commonActionArgs,
    }
  );

  const { createOne, isLoading: isCreating } = useCreateAction<
    T,
    State,
    FormSchema
  >({
    ...commonActionArgs,
  });

  const prepareData = (data: T[]): T[] => {
    return data.map((row) => ({ key: row[idSource], ...row }));
  };

  const prepareColumns = (columns: ColumnsType<T>): ColumnsType<T> => {
    const { renderDetail, renderEdit } = toggledActions;

    const columnsWithActions = [...columns];

    columnsWithActions.push({
      title: "",
      dataIndex: idSource as any,
      render(key, record) {
        return (
          <Space key={key}>
            <DetailAction<T>
              key="detail"
              record={record}
              idSource={idSource}
              renderDismissible={renderDetail}
            />

            <EditAction<T, FormSchema>
              key="edit"
              isLoading={isEditing}
              record={record}
              idSource={idSource}
              onEdit={editOne}
              renderDismissible={renderEdit}
            />

            <DeleteAction
              key="delete"
              isLoading={isDeleting}
              onDelete={deleteOne}
              record={record}
              idSource={idSource}
            />
          </Space>
        );
      },
    });

    return columnsWithActions;
  };

  const onChange: TableProps<T>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <React.Fragment>
      <Card style={{ marginBottom: 30 }}>
        <Box className={classes.header}>
          <Box className={classes.title}>{title}</Box>

          <Space direction="horizontal">
            <Button shape="round" icon={<ExportOutlined />} block />
            <CreateAction
              isLoading={isLoading}
              onCreate={createOne}
              renderDismissible={renderCreate}
            />
          </Space>
        </Box>
      </Card>

      <Table
        loading={isLoading}
        // rowSelection={rowSelection}
        columns={prepareColumns(columns) as any}
        dataSource={prepareData(results) as any}
        onChange={onChange as any}
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
