import { useMemo } from "react";
import { useListAction } from "features/Crud/useListAction";
import { criterionSlice } from "redux/slices/criterionSlice";
import { Criterion } from 'library/models/Criterion';
import { CriterionService } from 'library/api/services/CriterionService';
import { CriterionMapper } from 'library/api/mappers/CriterionMapper';

export function useCriterionOptions() {
  const criterionService = new CriterionService();

  const { isLoading, results: criterions } = useListAction<Criterion>({
    selectLoading: (state) => state.criterions.isLoading,
    selectResults: (state) => state.criterions.results,
    reducer: criterionSlice,
    service: criterionService,
  });

  const criterionOptions = useMemo(() => {
    const criterionMapper = new CriterionMapper();
    return criterions.map(criterionMapper.toSelectOption);
  }, [criterions]);

  return { isLoading, criterionOptions } ;
}