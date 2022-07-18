import { useListAction } from 'features/Crud/useListAction';
import { Form } from "antd";
import { CriterionFormSchema } from "./CriterionFormSchema";
import { useOptionGroup } from "library/hooks/useOptionGroup";
import { lineamentSlice } from "main/store/slices/lineamentSlice";
import { LineamentService } from "library/api/services/LineamentService";
import { Lineament } from 'library/models/Lineament';

export function useCriterionForm() {
  const [form] = Form.useForm<CriterionFormSchema>();
  const lineamentService = new LineamentService();
  
  const { results: lineaments } = useListAction<Lineament>({
    selectLoading: (state) => state.lineaments.isLoading,
    selectResults: (state) => state.lineaments.results,
    reducer: lineamentSlice,
    service: lineamentService,
  });
  
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
