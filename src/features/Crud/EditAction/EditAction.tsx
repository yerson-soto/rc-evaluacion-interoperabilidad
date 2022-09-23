import React from "react";
import { Button } from "antd";
import { useToogleAction } from "library/hooks/useToggleAction";
import { EditOutlined } from "@ant-design/icons";
import { RootState } from 'redux/types';
import { useEditAction } from "./useEditAction";
import { CrudRepository } from "library/api/services/AbstractCrudService";
import { CrudReducer, CrudState } from "library/common/interfaces";

export interface RenderEdit<T, FormSchema> {
  record: T;
  visible: boolean;
  loading: boolean;
  onClose: () => void;
  onSave: (data: FormSchema) => Promise<void>;
}

export interface EditActionProps<T, FormSchema, State extends CrudState<T>> {
  record: T;
  idSource: keyof T;
  service: CrudRepository<T, FormSchema>;
  reducer: CrudReducer<T, State>;
  selectLoading: (state: RootState) => boolean;

  renderForm: (params: RenderEdit<T, FormSchema>) => React.ReactNode;
  renderTrigger?: (trigger: () => void) => void;
}

export default function EditAction<T, FormSchema, State extends CrudState<T>>(
  props: EditActionProps<T, FormSchema, State>
) {
  const { record, service, reducer, idSource, selectLoading, renderForm, renderTrigger } = props;
  const { isOpen, onOpen, onCloseEnd } = useToogleAction<T>({
    action: "edit",
    keyFrom: idSource,
    state: record,
  });

  const { editOne, isLoading } = useEditAction<T, FormSchema, State>({
    selectLoading,
    service,
    reducer,
  });

  const handleSave = async (schema: FormSchema) => {
    return await editOne(record[idSource] as any, schema);
  };
  
  const renderEdit = () => renderForm({
    record,
    visible: isOpen,
    loading: isLoading,
    onClose: onCloseEnd,
    onSave: handleSave,
  })

  return (
    <>
      {renderTrigger ? (
        renderTrigger(onOpen)
      ) : (
        <Button
          size="small"
          type="link"
          shape="round"
          icon={<EditOutlined />}
          onClick={onOpen}
        ></Button>
      )}
      
      {renderEdit()}
    </>
  );
}
