import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "library/common/interfaces";
import { ErrorMessage } from "library/common/types";
import { Question } from "library/models/Question";
import { Choice } from "library/models/Choice";
import { AnswerEvidence } from 'library/models/Question';

const isQuestionCompleted = (question: Question) => {
  const { choosenAnswer, answerEvidences } = question;
  const isEvidenceRequired = choosenAnswer?.isEvidenceRequired;

  if (isEvidenceRequired) {
    const answerEvidencesIds = answerEvidences.map((ae) => ae.id);
    const { requiredEvidences } = choosenAnswer;

    return requiredEvidences.every((e) => answerEvidencesIds.includes(e.id));

  } else {
    return Boolean(choosenAnswer);
  }
};

type QuestionNumber = number;

export interface QuestionState extends CommonState {
  questionary: Question[];
  current: QuestionNumber | 'finish-page';
  score: number;
  isSaving: boolean;
}

const initialState: QuestionState = {
  questionary: [],
  score: 0,
  current: 1,
  isLoading: false,
  isSaving: false,
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
    startSaveLoading: (state) => {
      state.isSaving = true;
    },
    getSuccess: (state, action: PayloadAction<Question[]>) => {
      const firstIncompleted = action.payload.find(q => !q.isCompleted);

      if (firstIncompleted) {
        state.current = firstIncompleted.number;
      } else {
        state.current = 'finish-page';
      }
      
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
    updateAnswerSuccess: (state, action: PayloadAction<Choice>) => {
      const question = state.questionary.find(
        (question) => question.criterion.id === action.payload.criterion.id
      );

      if (question) {
        question.choosenAnswer = action.payload;
        question.isCompleted = isQuestionCompleted(question);
        question.isSaved = false;
      }
    },
    updateEvidencesSuccess: (state, action: PayloadAction<[Question, AnswerEvidence[]]>) => {
      const [{ criterion }, evidences] = action.payload;

      const question = state.questionary.find((q) => q.criterion.id === criterion.id);
      
      if (question) {
        question.answerEvidences = evidences;
        question.isCompleted = isQuestionCompleted(question);
        question.isSaved = false
      }
    },
    saveQuestionSuccess: (state, action: PayloadAction<Question>) => {
      const updatedQuestion = action.payload;
      const questionIndex = state.questionary.findIndex((q) => {
        return q.criterion.id === updatedQuestion.criterion.id;
      });

      if (questionIndex !== -1) {
        updatedQuestion.isSaved = true
        state.questionary.splice(questionIndex, 1, updatedQuestion);
      }

      state.isSaving = false;
    },
    saveQuestionFailed: (state, action: PayloadAction<Question>) => {
      const { criterion } = action.payload;
      const question = state.questionary.find((q) => q.criterion.id === criterion.id);

      if (question) {
        question.isSaved = false;
      }

      state.isSaving = false;
    },
    currentChanged: (state, action: PayloadAction<QuestionNumber | 'finish-page'>) => {
      state.current = action.payload;
    },
    questionsFlushed: (state) => {
      state.questionary = [];
      state.current = 1;
      state.errorMessage = "";
      state.hasError = false;
    }
  },
});

export const actions = questionSlice.actions;
