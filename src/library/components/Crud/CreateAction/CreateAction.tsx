import React from 'react';
import { useToogleAction } from '../useToggleAction';

export default function CreateAction() {
  const { isOpen, onOpen, onCloseEnd } = useToogleAction({
    action: "create",
  });

  // const { createOne, isLoading } = useCreateAction<
  //   Domain,
  //   DomainState,
  //   DomainFormSchema
  // >({
  //   loadingSelector: (state) => state.domains.isLoading,
  //   service: DomainService,
  //   reducer: domainSlice,
  // });

  // return (
  //   <React.Fragment>
  //     <Button
  //       type="primary"
  //       shape="round"
  //       block
  //       icon={<PlusOutlined />}
  //       onClick={onOpen}
  //     ></Button>

  //     <DomainForm
  //       show={isOpen}
  //       isLoading={isLoading}
  //       onHide={onCloseEnd}
  //       onSave={createOne}
  //     />
  //   </React.Fragment>
  // );
  return <p></p>
};