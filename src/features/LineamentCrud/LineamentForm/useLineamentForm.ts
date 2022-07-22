import { Form } from "antd";
import { LineamentFormSchema } from "./LineamentFormSchema";

export function useLineamentForm() {
  const [form] = Form.useForm<LineamentFormSchema>();

  const resetForm = (): void => {
    form.resetFields();
  };

  return { form, resetForm };
}
