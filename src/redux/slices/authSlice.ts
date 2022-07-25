import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { Token } from "library/models/Token";
import { AuthUser } from "library/models/User";
import { keys } from "library/common/constants";

interface AuthState extends CommonState {
  user: AuthUser;
  token: string;
  isLogged: boolean;
  isLoadingUser: boolean;
}

const defaultToken = localStorage.getItem(keys.tokenLocalStorage) || "";

const initialState: AuthState = {
  user: {
    uid: "",
    identification: "",
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    type: 0,
    organization: {
      id: 0,
      name: "",
      acronym: "",
      emailDomain: "",
    },
  },
  token: defaultToken,
  isLoadingUser: true,
  isLogged: false,
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
    userLoading: (state) => {
      state.isLoadingUser = true;
    },
    cancelUserLoading: (state) => {
      state.isLoadingUser = false;
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
    logoutDone: (state) => {
      state.token = "";
      state.user = initialState.user;
      state.isLogged = false;
      state.isLoading = false;
      state.hasError = false;
      state.errorMessage = "";
    },

    loadUserSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isLogged = true;
      state.isLoading = false;
      state.isLoadingUser = false;
      state.hasError = false;
      state.errorMessage = "";
    },
    loadUserFailed: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoading = false;
      state.isLoadingUser = false;
      state.hasError = true;
      state.token = "";
      state.errorMessage = action.payload;
    },
  },
});

export const {
  authLoading,
  userLoading,
  cancelUserLoading,
  loginDone,
  loginFailed,
  logoutDone,
  loadUserSuccess,
  loadUserFailed,
} = authSlice.actions;
