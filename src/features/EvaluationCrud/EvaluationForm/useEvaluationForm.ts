import React from "react";
import { Form } from "antd";
import { EvaluationFormSchema } from "./EvaluationFormSchema";

export function useEvaluationForm() {
  const [form] = Form.useForm<EvaluationFormSchema>();

  const resetForm = () => {
    form.resetFields();
  };

  return { form, resetForm };
}
