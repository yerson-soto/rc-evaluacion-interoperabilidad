import { CrudState } from "library/common/interfaces";
import { Level } from "library/models/Level";
import { createCrudSlice } from "redux/actions/sliceCreator";

export interface LevelState extends CrudState<Level> {}

const initialState: LevelState = {
  results: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const levelSlice = createCrudSlice<Level, LevelState, "levels">({
  name: "levels",
  idSource: "id",
  initialState,
});

export const { ...actions } = levelSlice.actions;
