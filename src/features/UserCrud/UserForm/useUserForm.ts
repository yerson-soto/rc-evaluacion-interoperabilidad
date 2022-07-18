import { Form } from "antd";
import { UserFormSchema } from "./UserFormSchema";
import { useOrganizationList } from '../../EvaluationList/AddEvaluation/useOrganizacionList';

export function useUserForm() {
  const [form] = Form.useForm<UserFormSchema>();

  const { organizations } = useOrganizationList();

  const resetForm = (): void => {
    form.resetFields();
  };

  return { form, organizations, resetForm };
}
