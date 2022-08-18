import { useState, useEffect } from "react";
import { message } from "antd";
import { CriterionService } from "library/api/services/CriterionService";
import { actions } from "redux/slices/questionSlice";
import { useAppDispatch } from "redux/hooks";
import { ChangeAnswer } from "library/api/dto/criterion-dto";

export function useCompleteQuestion() {
  const criterionService = new CriterionService();

  const dispatch = useAppDispatch();

  const changeAnswer = (
    evaluationId: string,
    criterionId: number,
    choiceId: number
  ) => {
    const payload: ChangeAnswer = {
      evaluationInstitutionalId: evaluationId,
      criterionId,
      responsesId: choiceId,
    };

    criterionService
      .changeAnswer(payload)
      .then((choice) => {
        dispatch(actions.changeAnswerSuccess(choice));
      })
      .catch((errorMessage) => {
        message.error(errorMessage);
      });
  };

  return { changeAnswer };
}
