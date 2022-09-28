import {  } from '@reduxjs/toolkit';
import { createContext, PropsWithChildren, useReducer } from "react";
import { Evaluation } from 'library/models/Evaluation';
import { getScoreColor } from 'library/helpers/score-color';

export interface EvaluationDetailState {
  evaluation: Evaluation | null;
  isLoading: boolean;
}

export interface EvaluationContextProps {
  evaluationState: EvaluationDetailState;
  changeScore: (score: number) => void;
  setEvaluation: (evaluation: Evaluation | null) => void;
}

type LoginAction = 
    | { type: 'setEvaluation', payload: Evaluation | null } 
    | { type: 'changeScore', payload: number };

const initialState: EvaluationDetailState = {
  evaluation: null,
  isLoading: true,
};

export const EvaluationDetailContext = createContext({} as EvaluationContextProps);

export const EvaluationDetailProvider = (props: PropsWithChildren<{}>) => {
  const [evaluationState, dispatch] = useReducer(evaluationDetailReducer, initialState);
  
  const setEvaluation = (evaluation: Evaluation | null): void => {
    dispatch({ type: 'setEvaluation', payload: evaluation });
  }
  
  const changeScore = (score: number): void => {
    const roundedScore = Number(score.toFixed(2));
    dispatch({ type: 'changeScore', payload: roundedScore });
  }

  return (
    <EvaluationDetailContext.Provider
      value={{
        evaluationState,
        setEvaluation,
        changeScore
      }}
    >
      {props.children}
    </EvaluationDetailContext.Provider>
  );
};

function evaluationDetailReducer(
  state: EvaluationDetailState, 
  action: LoginAction 
): EvaluationDetailState {
  switch ( action.type ) {
    case "setEvaluation":
      return { evaluation: action.payload, isLoading: false };
    case "changeScore":
      if (state.evaluation) {
        const newColor = getScoreColor(action.payload);

        return {
          evaluation: { 
            ...state.evaluation, 
            scoreColor: newColor, 
            score: action.payload 
          },
          isLoading: false,
        }
      } else return state
    
    default:
      return state;
  }
};
