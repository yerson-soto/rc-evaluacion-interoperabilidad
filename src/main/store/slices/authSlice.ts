import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { Token } from "library/models/Token";

interface AuthState extends CommonState {
  token: string;
}

const initialState: AuthState = {
  token: "",
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLoading: (state) => {
      state.isLoading = true;
    },
    loginDone: (state, action: PayloadAction<Token>) => {
      state.token = action.payload.value;
      state.isLoading = false;
      state.hasError = false;
      state.errorMessage = "";
    },
    loginFailed: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload;
    },
  },
});

export const { authLoading, loginDone, loginFailed } = authSlice.actions;
