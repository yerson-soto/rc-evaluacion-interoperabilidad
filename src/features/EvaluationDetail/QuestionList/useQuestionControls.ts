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
  const { isSaving, questionary, activeQuestion } = useAppSelector(
    (state) => state.questions
  );
  const dispatch = useAppDispatch();
  const questionService = new QuestionService();
  const { changeScore } = useContext(EvaluationDetailContext);

  const { t } = useTranslation();
  const { uid: evaluationId } = useParams();

  const setActiveQuestion = async (questionNumber: number): Promise<void> => {
    const isNext = questionNumber > activeQuestion;

    if (isNext) {
      const question = questionary.find((q) => q.number === activeQuestion);
      
      if (!question || !evaluationId) return;

      const shouldUpdate = !question.isSaved && question.isCompleted;
      
      if (shouldUpdate) {
        try {
          await _updateQuestion(evaluationId, question);
        } catch {
          return;
        }

      } else if (!question.isSaved) {
        message.info(t("alerts.complete_question"));
        return;
      }
    }

    dispatch(actions.questionPrevNext(questionNumber));
  };

  const updateAnswer = (choice: Choice): void => {
    dispatch(actions.updateAnswerSuccess(choice));
  };

  const updateEvidences = (
    question: Question, 
    evidences: AnswerEvidence[]
  ): void => {
    dispatch(actions.updateEvidencesSuccess([question, evidences]));
  };

  const _updateQuestion = async (
    evaluationId: string, 
    question: Question
  ): Promise<void> => {
    const { choosenAnswer, answerEvidences } = question;

    if (choosenAnswer) {
      dispatch(actions.startSaveLoading());

      const payload: UpdateAnswer = {
        evaluationInstitutionalId: evaluationId,
        criterionId: choosenAnswer.criterion.id,
        responsesId: choosenAnswer.id,
      };

      try {
        const { uid, choice, overallScore } =
          await questionService.updateAnswer(payload);

        let newQuestion: Question = { ...question, choosenAnswer: choice };
        const shouldUploadFiles = choosenAnswer.isEvidenceRequired;

        if (shouldUploadFiles) {
          const uploadedFiles = await questionService.updateEvidences(
            uid,
            choice.id,
            answerEvidences
          );

          newQuestion = { 
            ...question, 
            answerEvidences: uploadedFiles 
          };
        }
 
        // Save question in state
        dispatch(actions.saveQuestionSuccess(newQuestion));

        // Update evaluation score
        changeScore(overallScore);
        
      } catch (errorMessage: any) {

        dispatch(actions.saveQuestionFailed(question));
        message.error(errorMessage);

        throw new Error(errorMessage);
      }
    }
  };

  return {
    isSaving,
    activeQuestion,
    updateAnswer,
    updateEvidences,
    setActiveQuestion
  };
}
