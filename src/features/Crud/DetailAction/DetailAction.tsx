import React from "react";
import { Button } from "antd";
import { useToogleAction } from "../useToggleAction";
import { EyeOutlined } from "@ant-design/icons";

export interface RenderDetail<T> {
  record: T;
  visible: boolean;
  onClose: () => void;
}

export interface DetailActionProps<T> {
  record: T;
  idSource: keyof T;
  renderDismissible: (params: RenderDetail<T>) => React.ReactNode;
}

export default function DetailAction<T>(props: DetailActionProps<T>) {
  const { record, idSource, renderDismissible } = props;

  const { isOpen, onOpen, onCloseEnd } = useToogleAction<T>({
    action: "detail",
    keyFrom: idSource,
    state: record,
  });

  return (
    <React.Fragment>
      <Button
        size="small"
        type="link"
        shape="round"
        icon={<EyeOutlined />}
        onClick={onOpen}
      ></Button>

      {renderDismissible({
        record,
        visible: isOpen,
        onClose: onCloseEnd,
      })}
    </React.Fragment>
  );
}
