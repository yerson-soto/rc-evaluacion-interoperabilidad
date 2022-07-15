import { Form } from "antd";
import { LineamentFormSchema } from "./LineamentFormSchema";
import { useAppSelector } from 'main/store';

export function useLineamentForm() {
  const [form] = Form.useForm<LineamentFormSchema>();

  const domains = useAppSelector(state => state.domains.results);

  const resetForm = (): void => {
    form.resetFields();
  };

  return { form, domains, resetForm };
}
