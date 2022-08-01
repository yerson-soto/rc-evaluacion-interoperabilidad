import { useListAction } from "features/Crud/useListAction";
import { lineamentSlice } from "redux/slices/lineamentSlice";
import { LineamentService } from "library/api/services/LineamentService";
import { Lineament } from "library/models/Lineament";
import { useOptionGroup } from "library/hooks/useOptionGroup";
import { LineamentState } from 'redux/slices/lineamentSlice';

export function useLineamentOptions() {
  const lineamentService = new LineamentService();

  const { isLoading, results: lineaments } = useListAction<Lineament, LineamentState>({
    selectLoading: (state) => state.lineaments.isLoading,
    selectResults: (state) => state.lineaments.results,
    reducer: lineamentSlice,
    service: lineamentService,
  });

  const { optionGroup: lineamentOptions } = useOptionGroup({
    options: lineaments,
    selectGroupId: (option) => option.domain.id,
    selectGroupName: (option) => option.domain.name,
  });

  const handleChange = (
    values: number[],
    onChangeCallback: (values: number[]) => void
  ): void => {
    // Options must not be combined between groups

    if (values.length > 1) {
      let currentGroupOptions: Lineament[] = [];
      const lastOption = values[values.length - 1],
        previousOption = values[values.length - 2];

      lineamentOptions.forEach((group) => {
        const isSelected = group.options.some(
          (option) => option.id === lastOption
        );

        if (isSelected) currentGroupOptions = group.options;
      });
      
      const isSameGroup = currentGroupOptions.some(
        (option) => option.id === previousOption
      );

      if (!isSameGroup) {
        onChangeCallback([lastOption]);

        return;
      }
    }

    onChangeCallback(values);
  };

  return { isLoading, lineamentOptions, handleChange };
}
