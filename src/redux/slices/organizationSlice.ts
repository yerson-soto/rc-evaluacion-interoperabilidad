import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from "library/models/Organization";
import { CommonState } from 'library/common/interfaces';
import { ErrorMessage } from 'library/common/types';

export interface OrganizationState extends CommonState {
  institutions: Organization[];
}

const initialState: OrganizationState = {
  institutions: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getSuccess: (state, action: PayloadAction<Organization[]>) => {
      state.institutions = action.payload;
      state.isLoading = false;
      state.hasError = false;
      state.errorMessage = "";
    },
    getFailed: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload;
    },
  }
});

export const actions = organizationSlice.actions;
