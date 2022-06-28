import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { Evaluation } from "library/models/Evaluation";

interface EvaluationState extends CommonState {
  results: Evaluation[];
}

const initialState: EvaluationState = {
  results: [],
  hasError: false,
  isLoading: false,
  errorMessage: "",
};

export const evaluationSlice = createSlice({
  name: "evaluations",
  initialState,
  reducers: {
    evaluationsLoad: (state) => {
      state.isLoading = true
    },
    evaluationsListed: (state, action: PayloadAction<Evaluation[]>) => {
      state.isLoading = false
      state.results = action.payload
    },
    evaluationsNotListed: (state, action: PayloadAction<ErrorMessage>) => {
      state.results = []
      state.isLoading = false
      state.hasError = true
      state.errorMessage = action.payload
    },

    evaluationCreated: (state, action: PayloadAction<Evaluation>) => {
      state.isLoading = false
      state.results.unshift({...action.payload, score: null})
    },
    evaluationNotCreated: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoading = false
      state.hasError = true
      state.errorMessage = action.payload
    }
  },
});


export const {
  evaluationsLoad,
  evaluationsListed,
  evaluationsNotListed,

  evaluationCreated,
  evaluationNotCreated
} = evaluationSlice.actions;

export default evaluationSlice.reducer;