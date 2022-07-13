import React from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@ant-design/icons';
import { ID } from "library/common/types";

export interface DeleteActionProps<T> {
  record: T;
  idSource: keyof T;
  isLoading: boolean;
  onDelete: (id: ID) => Promise<void>;
}

export default function DeleteAction<T>(props: DeleteActionProps<T>) {
  const { record, idSource, isLoading, onDelete } = props;
  const { t } = useTranslation();

  return (
    <Popconfirm
      placement="right"
      title={t("questions.are_you_sure")}
      okText={t("buttons.yes")}
      cancelText={"buttons.no"}
      onConfirm={() => onDelete(record[idSource] as any)}
    >
      <Button
        loading={isLoading}
        size="small"
        type="link"
        shape="round"
        icon={<DeleteOutlined />}
        danger
      ></Button>
    </Popconfirm>
  );
}
