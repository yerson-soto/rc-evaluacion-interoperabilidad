import { useState, useEffect } from "react";
import { message } from "antd";
import { CriterionService } from "library/api/services/CriterionService";
import { actions } from "redux/slices/questionSlice";
import { Question } from "library/models/Question";
import { useAppDispatch } from "redux/hooks";
import { Choice } from "library/models/Choice";
import { AnswerEvidence } from "library/models/Question";

export function useCompleteQuestion() {
  const criterionService = new CriterionService();

  const dispatch = useAppDispatch();

  const updateAnswer = (
    evaluationId: string, 
    choice: Choice
  ) => {
    console.log('choosen', choice)
    dispatch(actions.updateAnswerSuccess(choice));

    // const payload: ChangeAnswer = {
    //   evaluationInstitutionalId: evaluationId,
    //   criterionId: choice.criterion.id,
    //   responsesId: choice.id,
    // };

    // criterionService
    //   .changeAnswer(payload)
    //   .then((choice) => {
    //     dispatch(actions.changeAnswerSuccess(choice));
    //   })
    //   .catch((errorMessage) => {
    //     message.error(errorMessage);
    //   });
  };

  const updateEvidences = (
    question: Question, 
    evidences: AnswerEvidence[]
  ) => {
    console.log(evidences);
    dispatch(actions.updateEvidencesSuccess([question, evidences]));
  };

  return { updateAnswer, updateEvidences };
}
