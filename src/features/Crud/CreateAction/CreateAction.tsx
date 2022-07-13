import React from "react";
import { Button } from "antd";
import { useToogleAction } from "../useToggleAction";
import { PlusOutlined } from "@ant-design/icons";

export interface RenderCreate<FormSchema> {
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: FormSchema) => Promise<void>;
}

export interface CreateActionProps<T, FormSchema> {
  isLoading: boolean;
  onCreate: (data: FormSchema) => Promise<void>;
  renderDismissible: (params: RenderCreate<FormSchema>) => React.ReactNode;
}

export default function CreateAction<T, FormSchema>(
  props: CreateActionProps<T, FormSchema>
) {
  const { onCreate, isLoading, renderDismissible } = props;

  const { isOpen, onOpen, onCloseEnd } = useToogleAction({
    action: "create",
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

      {renderDismissible({
        visible: isOpen,
        loading: isLoading,
        onSave: onCreate,
        onClose: onCloseEnd,
      })}
    </React.Fragment>
  );
}
