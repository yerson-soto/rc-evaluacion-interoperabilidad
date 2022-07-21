import { useListAction } from "features/Crud/useListAction";
import { Form } from "antd";
import { CriterionFormSchema } from "./CriterionFormSchema";
import { useOptionGroup } from "library/hooks/useOptionGroup";
import { lineamentSlice } from "redux/slices/lineamentSlice";
import { LineamentService } from "library/api/services/LineamentService";
import { Lineament } from "library/models/Lineament";

export function useCriterionForm() {
  const [form] = Form.useForm<CriterionFormSchema>();
  const lineamentService = new LineamentService();

  const { results: lineaments } = useListAction<Lineament>({
    selectLoading: (state) => state.lineaments.isLoading,
    selectResults: (state) => state.lineaments.results,
    reducer: lineamentSlice,
    service: lineamentService,
  });

  const optionGroup = useOptionGroup({
    options: lineaments,
    selectGroupId: (option) => option.domain.id,
    selectGroupName: (option) => option.domain.name,
  });

  const changeOption = (values: number[]): void => {
    // Options must not be combined between groups

    if (values.length > 1) {
      let currentOptions: Lineament[] = [];
      const lastOption = values[values.length - 1],
        previousOption = values[values.length - 2];

      optionGroup.forEach((group) => {
        const isSelected = group.options.some(
          (option) => option.id === lastOption
        );

        if (isSelected) currentOptions = group.options;
      });

      const isSameGroup = currentOptions.some(
        (option) => option.id === previousOption
      );

      if (!isSameGroup) {
        form.setFieldsValue({ lineaments: [lastOption] });
      }
    }
  };

  const resetForm = (): void => {
    form.resetFields();
  };

  return { form, optionGroup, changeOption, resetForm };
}
