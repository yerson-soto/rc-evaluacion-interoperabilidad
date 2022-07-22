import { Form } from "antd";
import { ChoiceFormSchema } from "./ChoiceFormSchema";

export function useChoiceForm() {
  const [form] = Form.useForm<ChoiceFormSchema>();

  const resetForm = (): void => {
    form.resetFields();
  };

  return { form, resetForm };
}
