import { message } from "antd";
import { actions } from "redux/slices/questionSlice";
import { Question } from "library/models/Question";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Choice } from "library/models/Choice";
import { AnswerEvidence } from "library/models/Question";

message.config({ maxCount: 3 });

export function useQuestionChange() {
  const currentPage = useAppSelector((state) => state.questions.current);
  const dispatch = useAppDispatch();
  
  const updateAnswer = (choice: Choice): void => {
    dispatch(actions.updateAnswerSuccess(choice));
  };
  
  const updateEvidences = (question: Question, evidences: AnswerEvidence[]): void => {
    dispatch(actions.updateEvidencesSuccess([question, evidences]));
  };

  return { currentPage, updateAnswer, updateEvidences };
}
