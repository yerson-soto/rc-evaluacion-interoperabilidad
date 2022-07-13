import React from "react";
import { Button } from "antd";
import { useToogleAction } from "../useToggleAction";
import { EditOutlined } from "@ant-design/icons";
import { ID } from "library/common/types";

export interface RenderEdit<T, FormSchema> {
  record: T;
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: FormSchema) => Promise<void>;
}

export interface EditActionProps<T, FormSchema> {
  record: T;
  idSource: keyof T;
  isLoading: boolean;
  onEdit: (id: ID, data: FormSchema) => Promise<void>;
  renderDismissible: (params: RenderEdit<T, FormSchema>) => React.ReactNode;
}

export default function EditAction<T, FormSchema>(
  props: EditActionProps<T, FormSchema>
) {
  const { record, isLoading, idSource, onEdit, renderDismissible } = props;
  const { isOpen, onOpen, onCloseEnd } = useToogleAction<T>({
    action: "edit",
    keyFrom: idSource,
    state: record,
  });

  const handleSave = async (schema: FormSchema) => {
    return await onEdit(record[idSource] as any, schema);
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        type="link"
        shape="round"
        icon={<EditOutlined />}
        onClick={onOpen}
      ></Button>

      {renderDismissible({
        record,
        visible: isOpen,
        loading: isLoading,
        onClose: onCloseEnd,
        onSave: handleSave,
      })}
    </React.Fragment>
  );
}
