import React from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteAction } from "./useDeleteAction";
import { RootState } from "main/store";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { CrudReducer } from "library/common/interfaces";

export interface DeleteActionProps<T> {
  record: T;
  idSource: keyof T;
  service: CrudRepository<T, any>;
  reducer: CrudReducer<T>;
  selectLoading: (state: RootState) => boolean;
}

export default function DeleteAction<T>(props: DeleteActionProps<T>) {
  const { record, idSource, service, reducer, selectLoading } = props;
  const { t } = useTranslation();

  const { deleteOne } = useDeleteAction<T>({
    selectLoading,
    service,
    reducer,
  });

  return (
    <Popconfirm
      placement="right"
      title={t("questions.delete_item")}
      okText={t("buttons.yes")}
      cancelText={t("buttons.no")}
      onConfirm={() => deleteOne(record[idSource] as any)}
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
}
