import { CrudState } from "library/common/interfaces";
import { Domain } from "library/models/Domain";
import { createCrudSlice } from "./sliceCreator";

export interface DomainState extends CrudState<Domain> {}

const initialState: DomainState = {
  results: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const domainSlice = createCrudSlice<Domain, DomainState, "domains">({
  name: "domains",
  initialState,
  idSource: "id",
});

export const { ...actions } = domainSlice.actions;
