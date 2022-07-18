import React, { useState } from "react";
import { Space, TableProps } from "antd";
import { DeleteAction } from "./DeleteAction";
import { EditAction, RenderEdit } from "./EditAction";
import { DetailAction, RenderDetail } from "./DetailAction";
import { ColumnsType } from "antd/lib/table";
import { CrudReducer } from "library/common/interfaces";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { useListAction } from "./useListAction";
import { RootState } from "main/store";

interface UseCrudOptions<T, FormSchema> {
  idSource: keyof T;
  service: CrudRepository<T, FormSchema>;
  reducer: CrudReducer<T>;

  editModal: (args: RenderEdit<T, FormSchema>) => React.ReactNode;
  detailModal: (args: RenderDetail<T>) => React.ReactNode;
  selectLoading: (state: RootState) => boolean;
  selectResults: (state: RootState) => T[];
}

export function useCrud<T, FormSchema>(options: UseCrudOptions<T, FormSchema>) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const {
    idSource,
    service,
    reducer,
    editModal,
    detailModal,
    selectLoading,
    selectResults,
  } = options;

  const { results, isLoading } = useListAction<T>({
    selectLoading,
    selectResults,
    service,
    reducer,
  });

  const getDataWithKeys = (): T[] => {
    return results.map((row) => ({ key: row[idSource], ...row }));
  };
  
  const onChange: TableProps<T>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const actionColumns: ColumnsType<T> = [
    {
      title: "",
      dataIndex: idSource as any,
      render(key, record) {
        return (
          <Space key={key} size={1} wrap>
            <DetailAction<T>
              key="detail"
              record={record}
              idSource={idSource}
              renderDismissible={detailModal}
            />

            <EditAction<T, FormSchema>
              key="edit"
              record={record}
              idSource={idSource}
              service={service}
              reducer={reducer}
              render={editModal}
              selectLoading={selectLoading}
            />

            <DeleteAction<T>
              key="delete"
              record={record}
              idSource={idSource}
              service={service}
              reducer={reducer}
              selectLoading={selectLoading}
            />
          </Space>
        );
      },
    },
  ];

  return {
    results: getDataWithKeys(),
    isLoading,
    onChange,
    actionColumns,
    rowSelection,
  };
}
