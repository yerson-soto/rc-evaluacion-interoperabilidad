import { useState, useEffect } from "react";
import { message } from "antd";
import { CriterionService } from "library/api/services/CriterionService";
import { actions } from "redux/slices/questionSlice";
import { useAppDispatch } from "redux/hooks";
import { ChangeAnswer } from "library/api/dto/criterion-dto";
import { Choice } from "library/models/Choice";

export function useCompleteQuestion() {
  const criterionService = new CriterionService();

  const dispatch = useAppDispatch();

  const changeAnswer = (evaluationId: string, choice: Choice) => {
    dispatch(actions.changeAnswerSuccess(choice));
    
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

  return { changeAnswer };
}
