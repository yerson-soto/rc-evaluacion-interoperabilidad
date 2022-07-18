import { Form } from "antd";
import { LevelFormSchema } from "./LevelFormSchema";
import { useAppSelector } from 'main/store';

export function useLevelForm() {
  const [form] = Form.useForm<LevelFormSchema>();

  const resetForm = (): void => {
    form.resetFields();
  };

  return { form, resetForm };
}
