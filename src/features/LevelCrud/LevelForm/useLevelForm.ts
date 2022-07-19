import { Form } from "antd";
import { LevelFormSchema } from "./LevelFormSchema";

export function useLevelForm() {
  const [form] = Form.useForm<LevelFormSchema>();

  const resetForm = (): void => {
    form.resetFields();
  };

  const normalizeName = (value: string) => value.toUpperCase();

  return { form, resetForm, normalizeName };
}
