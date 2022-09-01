import { message } from "antd";
import { actions } from "redux/slices/questionSlice";
import { Question } from "library/models/Question";
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Choice } from "library/models/Choice";
import { AnswerEvidence } from "library/models/Question";
import { UpdateAnswer } from "library/api/dto/question-dto";
import { QuestionService } from "library/api/services/QuestionService";

export function useQuestionControls() {
  const { questionary, activeQuestion } = useAppSelector(
    (state) => state.questions
  );
  const dispatch = useAppDispatch();
  const questionService = new QuestionService();

  const { t } = useTranslation();
  const { uid: evaluationId } = useParams<Record<"uid", string>>();

  const isQuestionCompleted = (question: Question) => {
    const { choosenAnswer, answerEvidences } = question;
    const isEvidenceRequired = choosenAnswer?.isEvidenceRequired;

    console.log(choosenAnswer, answerEvidences)
    if (isEvidenceRequired) {
      const requiredEvidencesIds = choosenAnswer.requiredEvidences.map(
        (re) => re.id
      );
      return answerEvidences.every((e) => requiredEvidencesIds.includes(e.id));
    } else {
      return Boolean(choosenAnswer);
    }
  };

  const setActiveQuestion = (questionNumber: number) => {
    const isNext = questionNumber > activeQuestion;
    if (isNext) {
      const question = questionary.find((q) => q.number === activeQuestion);

      if (evaluationId && question) {

        if (isQuestionCompleted(question)) {
          updateQuestion(evaluationId, question);

        } else {
          message.info(t("alerts.complete_question"))
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

  const updateQuestion = (evaluationId: string, question: Question) => {
    const { choosenAnswer, answerEvidences } = question;

    if (choosenAnswer) {
      const payload: UpdateAnswer = {
        evaluationInstitutionalId: evaluationId,
        criterionId: choosenAnswer.criterion.id,
        responsesId: choosenAnswer.id,
      };

      questionService
        .updateAnswer(payload)
        .then((answerResult) => {
          const { uid, choice, overallScore } = answerResult;
          const shouldUploadFiles = choosenAnswer.isEvidenceRequired;

          if (shouldUploadFiles) {
            questionService
              .updateEvidences(uid, choice.id, answerEvidences)
              .then((uploadedFiles) => {
                dispatch(
                  actions.updateEvidencesSuccess([question, uploadedFiles])
                );
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((errorMessage) => {
          message.error(errorMessage);
        });
    }
  };

  return {
    activeQuestion,
    updateAnswer,
    updateEvidences,
    updateQuestion,
    setActiveQuestion,
  };
}
