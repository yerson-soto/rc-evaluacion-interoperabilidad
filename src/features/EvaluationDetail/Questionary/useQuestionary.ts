import { useContext } from "react";
import { message } from "antd";
import { actions } from "redux/slices/questionSlice";
import { Question } from "library/models/Question";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { UpdateAnswer } from "library/api/dto/question-dto";
import { QuestionService } from "library/api/services/QuestionService";
import { EvaluationDetailContext } from "../EvaluationContext";

message.config({ maxCount: 3 });

export function useQuestionary(domainId?: number) {
  const { uid: evaluationId } = useParams();
  const { isSaving, questionary, current } = useAppSelector((state) => state.questions);
  const { changeScore } = useContext(EvaluationDetailContext);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const questionService = new QuestionService();
  const prevActive = typeof current === 'number' && current > 1;

  const prevQuestion = (): void => {
    if (prevActive) {
      dispatch(actions.currentChanged(current - 1));
    } else if (current === 'finish-page') {
      dispatch(actions.currentChanged(questionary.length));
    }
  }

  const nextQuestion = async (): Promise<void> => {
    const questionsRemain = typeof current === 'number' && current <= questionary.length;
    
    if (questionsRemain) {
      const question = questionary.find((q) => q.number === current);
      if (!question) return;

      const shouldUpdate = !question.isSaved && question.isCompleted;
      
      if (shouldUpdate) {
        try {
          await _updateQuestion(question);
        } catch {
          return;
        }

      } else if (!question.isSaved) {
        message.info(t("alerts.complete_question"));
        return;
      }

      const isLastQuestion = question.number === questionary.length;
      
      if (isLastQuestion) {
        dispatch(actions.currentChanged('finish-page'));
      } else {
        dispatch(actions.currentChanged(current + 1));
      }
    }
  }

  const _updateQuestion = async (question: Question): Promise<void> => {
    const { choosenAnswer, answerEvidences } = question;

    const shouldUpdate = evaluationId && domainId && choosenAnswer;

    if (shouldUpdate) {
      dispatch(actions.startSaveLoading());

      const payload: UpdateAnswer = {
        evaluationInstitutionalId: evaluationId,
        criterionId: choosenAnswer.criterion.id,
        responsesId: choosenAnswer.id,
        domainId: domainId
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
    current,
    prevActive,
    prevQuestion,
    nextQuestion
  };
}
