import React from "react";
import { Button } from "antd";
import { useToogleAction } from "../useToggleAction";
import { EditOutlined } from "@ant-design/icons";
import { RootState } from 'redux/types';
import { useEditAction } from "./useEditAction";
import { CrudRepository } from "library/api/repositories/CrudRepository";
import { CrudReducer } from "library/common/interfaces";

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
  service: CrudRepository<T, FormSchema>;
  reducer: CrudReducer<T>;
  render: (params: RenderEdit<T, FormSchema>) => React.ReactNode;
  selectLoading: (state: RootState) => boolean;
}

export default function EditAction<T, FormSchema>(
  props: EditActionProps<T, FormSchema>
) {
  const { record, service, reducer, idSource, render, selectLoading } = props;
  const { isOpen, onOpen, onCloseEnd } = useToogleAction<T>({
    action: "edit",
    keyFrom: idSource,
    state: record,
  });

  const { editOne, isLoading } = useEditAction<T, FormSchema>({
    selectLoading,
    service,
    reducer,
  });

  const handleSave = async (schema: FormSchema) => {
    return await editOne(record[idSource] as any, schema);
  };
  
  const renderEdit = () => render({
    record,
    visible: isOpen,
    loading: isLoading,
    onClose: onCloseEnd,
    onSave: handleSave,
  })

  return (
    <React.Fragment>
      <Button
        size="small"
        type="link"
        shape="round"
        icon={<EditOutlined />}
        onClick={onOpen}
      ></Button>

      {renderEdit()}
    </React.Fragment>
  );
}
