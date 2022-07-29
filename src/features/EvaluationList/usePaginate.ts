import { EvaluationService } from "library/api/services/EvaluationService";
import { useLoadList } from "library/hooks/useLoadList";
import { useAppSelector } from 'redux/hooks';
import * as actions from "redux/slices/evaluationSlice";
import { useListAction } from '../Crud/useListAction';
import { evaluationSlice } from '../../redux/slices/evaluationSlice';

export function useEvaluationList() {
  const { results } = useAppSelector(state => state.evaluations);
  
  const evaluationService = new EvaluationService();

  const { results: evaluations, isLoading} = useListAction({
    selectLoading: (state) => state.evaluations.isLoading,
    selectResults: (state) => state.evaluations.results,
    reducer: evaluationSlice,
    service: evaluationService
  });

  const nextPage = (): void => {
    
  }

  const previousPage = (): void => {
    
  }
}
