import { createSlice } from "@reduxjs/toolkit";
import { PaginationState } from "library/common/interfaces";
import { Ranking } from "library/models/Ranking";
import { createPaginationReducers } from "../reducers/paginationReducers";

export interface RankingState extends PaginationState<Ranking> {}

const reducers = createPaginationReducers<Ranking, RankingState>();

const initialState: RankingState = {
  results: [],
  total: 0,
  page: 1,
  pageSize: 10,
  filter: {
    sortType: "desc",
    sortBy: "score",
    search: "",
  },
  hasError: false,
  isLoading: false,
  errorMessage: "",
};

export const rankingSlice = createSlice({
  name: "rankings",
  initialState,
  reducers,
});

export const actions = rankingSlice.actions;
