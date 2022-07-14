import React from "react";
import { Button } from "antd";
import { RootState } from 'main/store/index';
import { useToogleAction } from "../useToggleAction";
import { PlusOutlined } from "@ant-design/icons";
import { useCreateAction } from "./useCreateAction";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { CrudReducer } from "library/common/interfaces";

export interface RenderCreate<FormSchema> {
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: FormSchema) => Promise<void>;
}

export interface CreateActionProps<T, FormSchema> {
  service: CrudRepository<T, FormSchema>;
  reducer: CrudReducer<T>;
  render: (params: RenderCreate<FormSchema>) => React.ReactNode;
  selectLoading: (state: RootState) => boolean;
}

export default function CreateAction<T, FormSchema>(
  props: CreateActionProps<T, FormSchema>
) {
  const { service, reducer, selectLoading, render } = props;

  const { isOpen, onOpen, onCloseEnd } = useToogleAction({
    action: "create",
  });

  const { createOne, isLoading } = useCreateAction<T, FormSchema>({
    selectLoading,
    service,
    reducer,
  });

  const renderCreate = () => render({
    visible: isOpen,
    loading: isLoading,
    onSave: createOne,
    onClose: onCloseEnd,
  })
  
  return (
    <React.Fragment>
      <Button
        type="primary"
        shape="round"
        block
        icon={<PlusOutlined />}
        onClick={onOpen}
      ></Button>

      {renderCreate()}
    </React.Fragment>
  );
}
