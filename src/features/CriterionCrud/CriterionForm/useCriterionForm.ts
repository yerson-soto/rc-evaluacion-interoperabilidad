import { Form } from "antd";
import { CriterionFormSchema } from "./CriterionFormSchema";

export function useCriterionForm() {
  const [form] = Form.useForm<CriterionFormSchema>();

  const resetForm = (): void => {
    form.resetFields();
  };

  const changeLineaments = (lineaments: number[]) => {
    return form.setFieldsValue({ lineaments });
  };

  return { form, resetForm, changeLineaments };
}
