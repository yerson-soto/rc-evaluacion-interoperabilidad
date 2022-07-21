import React from "react";
import { Form } from "antd";
import { EvaluationFormSchema } from "./EvaluationFormSchema";
import { OrganizationMapper } from "library/api/mappers/OrganizationMapper";
import { useOrganizationList } from "features/EvaluationList/AddEvaluation/useOrganizacionList";

export function useEvaluationForm() {
  const [form] = Form.useForm<EvaluationFormSchema>();

  const { organizations } = useOrganizationList();
  
  const orgMapper = new OrganizationMapper();
  const orgOptions = organizations.map(orgMapper.toSelectOption);

  const resetForm = () => {
    form.resetFields();
  };

  return { form, orgOptions, resetForm };
}
