import { CrudState } from "library/common/interfaces";
import { Criterion } from "library/models/Criterion";
import { createCrudSlice } from "redux/actions/sliceCreator";

export interface CriterionState extends CrudState<Criterion> {}

const initialState: CriterionState = {
  results: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const criterionSlice = createCrudSlice<Criterion, CriterionState, "criterions">({
  name: "criterions",
  idSource: "id",
  initialState,
});

export const { ...actions } = criterionSlice.actions;
