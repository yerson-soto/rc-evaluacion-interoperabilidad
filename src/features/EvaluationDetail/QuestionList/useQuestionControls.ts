import { useContext } from "react";
import { message } from "antd";
import { actions } from "redux/slices/questionSlice";
import { Question } from "library/models/Question";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Choice } from "library/models/Choice";
import { AnswerEvidence } from "library/models/Question";
import { UpdateAnswer } from "library/api/dto/question-dto";
import { QuestionService } from "library/api/services/QuestionService";
import { EvaluationDetailContext } from "../EvaluationContext";

message.config({ maxCount: 3 });

export function useQuestionControls() {
  const { questionary, activeQuestion } = useAppSelector(
    (state) => state.questions
  );
  const dispatch = useAppDispatch();
  const questionService = new QuestionService();
  const { changeScore } = useContext(EvaluationDetailContext);

  const { t } = useTranslation();
  const { uid: evaluationId } = useParams<Record<"uid", string>>();

  const setActiveQuestion = (questionNumber: number) => {
    const isNext = questionNumber > activeQuestion;
    if (isNext) {
      const question = questionary.find((q) => q.number === activeQuestion);

      if (evaluationId) {
        if (question?.isCompleted) {
          updateQuestion(evaluationId, question);
        } else {
          message.info(t("alerts.complete_question"));
        }
      }
    } else {
      dispatch(actions.questionPrevNext(questionNumber));
    }
  };

  const updateAnswer = (choice: Choice) => {
    dispatch(actions.updateAnswerSuccess(choice));
  };

  const updateEvidences = (question: Question, evidences: AnswerEvidence[]) => {
    dispatch(actions.updateEvidencesSuccess([question, evidences]));
  };

  const updateQuestion = async (evaluationId: string, question: Question) => {
    const { choosenAnswer, answerEvidences } = question;

    if (choosenAnswer) {
      const payload: UpdateAnswer = {
        evaluationInstitutionalId: evaluationId,
        criterionId: choosenAnswer.criterion.id,
        responsesId: choosenAnswer.id,
      };

      try {
        const { uid, choice, overallScore } =
          await questionService.updateAnswer(payload);
        const shouldUploadFiles = choosenAnswer.isEvidenceRequired;

        if (shouldUploadFiles) {
          const uploadedFiles = await questionService.updateEvidences(
            uid,
            choice.id,
            answerEvidences
          );

          dispatch(actions.updateEvidencesSuccess([question, uploadedFiles]));
        }

        changeScore(overallScore);
      } catch (errorMessage: any) {
        message.error(errorMessage);
      }
    }
  };

  return {
    activeQuestion,
    updateAnswer,
    updateEvidences,
    updateQuestion,
    setActiveQuestion
  };
}
