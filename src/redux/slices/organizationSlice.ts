import { CrudState } from "library/common/interfaces";
import { Organization } from "library/models/Organization";
import { createCrudSlice } from "redux/actions/sliceCreator";

export interface OrganizationState extends CrudState<Organization> {}

const initialState: OrganizationState = {
  results: [],
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const organizationSlice = createCrudSlice<
  Organization,
  OrganizationState,
  "organizations"
>({
  name: "organizations",
  idSource: "id",
  initialState,
});

export const { ...actions } = organizationSlice.actions;
