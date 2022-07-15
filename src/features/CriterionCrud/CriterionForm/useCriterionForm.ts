import { Form } from "antd";
import { CriterionFormSchema } from "./CriterionFormSchema";
import { useAppSelector } from "main/store";
import { useOptionGroup } from "library/hooks/useOptionGroup";



export function useCriterionForm() {
  const [form] = Form.useForm<CriterionFormSchema>();
  const lineaments = useAppSelector((state) => state.lineaments.results);
  const selectOptions = useOptionGroup({
    options: lineaments,
    selectGroupId: (option) => option.domain.id,
    selectGroupName: (option) => option.domain.name,
  });

  const resetForm = (): void => {
    form.resetFields();
  };

  return { form, selectOptions, resetForm };
}
