import { CrudState } from "library/common/interfaces";
import { Lineament } from "library/models/Lineament";
import { createCrudSlice } from "redux/sliceCreator";

export interface LineamentState extends CrudState<Lineament> {}

const initialState: LineamentState = {
  results: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const lineamentSlice = createCrudSlice<Lineament, LineamentState, "lineaments">({
  name: "lineaments",
  idSource: "id",
  initialState,
});

export const { ...actions } = lineamentSlice.actions;
