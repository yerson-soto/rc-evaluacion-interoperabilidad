import React, { useState } from "react";
import { Empty, Modal } from "antd";
import { Select } from "antd";
import { useOrganizationList } from "./useOrganizacionList";
import { useAddEvaluation } from './useAddEvaluation';

const { Option } = Select;

interface AddEvaluationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEvaluation(props: AddEvaluationProps) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [organization, setOrganization] = useState<number | null>(null);

  const { isLoading, organizations } = useOrganizationList();

  const { createEvaluation } = useAddEvaluation();

  const { isOpen, onClose } = props;

  const handleOk = async () => {
    if (organization) {
      setConfirmLoading(true);

      await createEvaluation(organization);
      
      setConfirmLoading(false);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const onChange = (value: string) => {
    setOrganization(Number(value));
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  return (
    <Modal
      title="Crear Evaluación"
      visible={isOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Crear"
      cancelText="Cancelar"
      destroyOnClose
    >
      <Select
        showSearch
        style={{
          width: "100%",
        }}
        loading={isLoading}
        size="large"
        placeholder="Selecciona una institución"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        notFoundContent={<Empty description="No hay instituciones" />}
      >
        {organizations.map((org) => (
          <Option key={org.id} value={org.id}>
            {org.name}
          </Option>
        ))}
      </Select>
    </Modal>
  );
}
