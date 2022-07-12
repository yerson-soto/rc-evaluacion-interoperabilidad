import React from 'react';
import { useToogleAction } from '../useToggleAction';
import { useEditAction } from 'library/hooks/useEditAction';
import { CrudState } from 'library/common/interfaces';

interface EditActionProps<T> {
  obj: T;
  keySource: keyof T;
}

export default function EditAction<T, State extends CrudState<T>, FormSchema>(props: EditActionProps<T>) {

  // const { obj, keySource } = props;
  
  // const { isOpen, onOpen, onCloseEnd } = useToogleAction<T>({
  //   action: "edit",
  //   keyFrom: keySource,
  //   state: obj,
  // });

  // const { editOne, isLoading } = useEditAction<T, State, FormSchema>({
  //   loadingSelector: (state) => state.domains.isLoading,
  //   service: DomainService,
  //   reducer: domainSlice,
  // });

  // return (
  //   <React.Fragment>
  //     <Button
  //       size="small"
  //       type="link"
  //       shape="round"
  //       icon={<EditOutlined />}
  //       onClick={onOpen}
  //     ></Button>

  //     <DomainForm
  //       show={isOpen}
  //       isLoading={isLoading}
  //       onHide={onCloseEnd}
  //       onSave={async (schema) => await editOne(domain.id, schema)}
  //       defaults={domain}
  //       isEdit
  //     />
  //   </React.Fragment>
  // );
};