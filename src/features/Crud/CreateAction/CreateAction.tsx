import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RootState } from 'redux/types';
import { useToogleAction } from "../useToggleAction";
import { useCreateAction } from "./useCreateAction";
import { CrudRepository } from "library/api/services/AbstractCrudService";
import { CrudReducer, CrudState } from "library/common/interfaces";

export interface RenderCreate<FormSchema> {
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: FormSchema) => Promise<void>;
}

export interface CreateActionProps<T, FormSchema, State extends CrudState<T>> {
  service: CrudRepository<T, FormSchema>;
  reducer: CrudReducer<T, State>;
  render: (params: RenderCreate<FormSchema>) => React.ReactNode;
  selectLoading: (state: RootState) => boolean;
}

export default function CreateAction<T, FormSchema, State extends CrudState<T>>(
  props: CreateActionProps<T, FormSchema, State>
) {
  const { service, reducer, selectLoading, render } = props;

  const { isOpen, onOpen, onCloseEnd } = useToogleAction({
    action: "create",
  });

  const { createOne, isLoading } = useCreateAction<T, FormSchema, State>({
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
      />

      {renderCreate()}
    </React.Fragment>
  );
}
