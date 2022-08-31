import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { Question } from "library/models/Question";
import { Choice } from "library/models/Choice";
import { AnswerEvidence } from 'library/models/Question';

export interface QuestionState extends CommonState {
  questionary: Question[];
  activeQuestion: number;
  score: number;
}

const initialState: QuestionState = {
  questionary: [],
  score: 0,
  activeQuestion: 1,
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    getSuccess: (state, action: PayloadAction<Question[]>) => {
      state.questionary = action.payload;
      state.isLoading = false;
      state.hasError = false;
      state.errorMessage = "";
    },
    getFailed: (state, action: PayloadAction<ErrorMessage>) => {
      state.isLoading = false;
      state.hasError = true;
      state.errorMessage = action.payload;
    },
    completeSuccess: (state, action: PayloadAction<Question>) => {
      const question = state.questionary.find(question => question.criterion.id === action.payload.criterion.id);

      if (question) {
        question.isCompleted = true;
      }
    },
    updateAnswerSuccess: (state, action: PayloadAction<Choice>) => {
      const question = state.questionary.find(
        (question) => question.criterion.id === action.payload.criterion.id
      );

      if (question) {
        question.choosenAnswer = action.payload;
      }
    },
    updateEvidencesSuccess: (state, action: PayloadAction<[Question, AnswerEvidence[]]>) => {
      const [question, evidences] = action.payload;

      const updateQuestion = state.questionary.find(
        (q) => q.criterion.id === question.criterion.id
      );
      
      if (updateQuestion) {
        updateQuestion.answerEvidences = evidences;
      }
    },
    questionPrevNext: (state, action: PayloadAction<number>) => {
      state.activeQuestion = action.payload;
    },
    questionsFlushed: (state) => {
      state.questionary = [];
      state.activeQuestion = 1;
      state.errorMessage = "";
      state.hasError = false;
    }
  },
});

export const actions = questionSlice.actions;
