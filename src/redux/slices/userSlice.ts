import { CrudState } from "library/common/interfaces";
import { User } from "library/models/User";
import { createCrudSlice } from "redux/sliceCreator";

export interface UserState extends CrudState<User> {}

const initialState: UserState = {
  results: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const userSlice = createCrudSlice<User, UserState, "users">({
  name: "users",
  idSource: "uid",
  initialState,
});

export const { ...actions } = userSlice.actions;
