import { CommonState } from 'library/common/interfaces';
import { Schedule } from 'library/models/Schedule';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorMessage } from 'library/common/types';

export interface ScheduleState extends CommonState {
  results: Schedule[];
}

const initialState: ScheduleState = {
  results: [],
  hasError: false,
  isLoading: false,
  errorMessage: "",
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    startLoadingSchedule: (state) => {
      state.isLoading = true;
    },
    loadScheduleSuccess: (state, action: PayloadAction<Schedule[]>) => {
      state.results = action.payload;
      state.isLoading = false;
      state.hasError = false;
      state.errorMessage = "";
    },
    loadScheduleFailed: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload;
    },
  }
})

export const actions = scheduleSlice.actions;
