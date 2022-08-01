import { useMemo } from "react";
import { useListAction } from "features/Crud/useListAction";
import { levelSlice } from "redux/slices/levelSlice";
import { LevelService } from 'library/api/services/LevelService';
import { Level } from 'library/models/Level';
import { LevelMapper } from 'library/api/mappers/LevelMapper';
import { LevelState } from 'redux/slices/levelSlice';

export function useLevelOptions() {
  const levelService = new LevelService();

  const { isLoading, results: levels } = useListAction<Level, LevelState>({
    selectLoading: (state) => state.levels.isLoading,
    selectResults: (state) => state.levels.results,
    reducer: levelSlice,
    service: levelService,
  });

  const levelOptions = useMemo(() => {
    const levelMapper = new LevelMapper();
    return levels.map(levelMapper.toSelectOption);
  }, [levels]);

  return { isLoading, levelOptions } ;
}