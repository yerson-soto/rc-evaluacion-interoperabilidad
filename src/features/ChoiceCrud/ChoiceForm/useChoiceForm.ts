import { useListAction } from 'features/Crud/useListAction';
import { Form } from "antd";
import { ChoiceFormSchema } from "./ChoiceFormSchema";
import { levelSlice } from "main/store/slices/levelSlice";
import { criterionSlice } from 'main/store/slices/criterionSlice';
import { LevelService } from "library/api/services/LevelService";
import { CriterionService } from "library/api/services/CriterionService";
import { Criterion } from 'library/models/Criterion';
import { Level } from 'library/models/Level';

export function useChoiceForm() {
  const [form] = Form.useForm<ChoiceFormSchema>();

  const levelService = new LevelService();
  const criterionService = new CriterionService();
  
  const { results: levels } = useListAction<Level>({
    selectLoading: (state) => state.levels.isLoading,
    selectResults: (state) => state.levels.results,
    reducer: levelSlice,
    service: levelService,
  });

  const { results: criterions } = useListAction<Criterion>({
    selectLoading: (state) => state.criterions.isLoading,
    selectResults: (state) => state.criterions.results,
    reducer: criterionSlice,
    service: criterionService,
  });

  const resetForm = (): void => {
    form.resetFields();
  };

  return { form, levels, criterions, resetForm };
}
