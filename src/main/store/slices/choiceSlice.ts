import { CrudState } from "library/common/interfaces";
import { Choice } from "library/models/Choice";
import { createCrudSlice } from "./sliceCreator";

export interface ChoiceState extends CrudState<Choice> {}

const initialState: ChoiceState = {
  results: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const choiceSlice = createCrudSlice<Choice, ChoiceState, "choices">({
  name: "choices",
  idSource: "id",
  initialState,
});

export const { ...actions } = choiceSlice.actions;
