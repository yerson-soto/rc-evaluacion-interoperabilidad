import { Form } from "antd";
import { ChoiceFormSchema } from "./ChoiceFormSchema";

export function useChoiceForm() {
  const [form] = Form.useForm<ChoiceFormSchema>();

  const resetForm = (): void => {
    form.resetFields();
  };

  const onRemoveEvidence = (
    fieldKey: number | number[],  
    removeFunc: (key: number | number[]) => void
  ) => {
    removeFunc(fieldKey);

    const { requiredEvidences } = form.getFieldsValue();
    
    // If all evidences are removed, then set evidence not required
    if (requiredEvidences.length === 0) {
      form.setFieldsValue({ isEvidenceRequired: false });
    }
  }
  
  return { form, resetForm, onRemoveEvidence };
}
