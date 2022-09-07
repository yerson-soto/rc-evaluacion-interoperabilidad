import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CriterionService } from "library/api/services/CriterionService";
import { Question } from "library/models/Question";
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { actions } from 'redux/slices/questionSlice';
import { QuestionService } from 'library/api/services/QuestionService';

export function useQuestionList(domainId?: number) {
  const { uid: evaluationId } = useParams();
  const { isLoading, questionary: questions } = useAppSelector(state => state.questions);
  const criterionService = new CriterionService();
  const questionService = new QuestionService();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchQuestions = async (evaluation: string, domain: number) => {
      dispatch(actions.startLoading())
      
      try {
        const criteria = await criterionService.getByDomain(domain);
        const completedQuestions = await questionService
          .getCompletedQuestionsByDomain(evaluation, domain);

        const questions: Question[] = criteria.map((criterion, key) => {
          const defaultQuestion = completedQuestions.find(
            (q) => q.criterion.id === criterion.id
          );
          
          const choosenAnswer = defaultQuestion 
            ? defaultQuestion.choosenAnswer 
            : null;
          
          const answerEvidences = defaultQuestion 
            ? defaultQuestion.answerEvidences 
            : [];
            
          return {
            number: key + 1,
            criterion,
            choosenAnswer,
            answerEvidences,
            isCompleted: Boolean(defaultQuestion),
            isSaved: Boolean(defaultQuestion)
          }
        });

        dispatch(actions.getSuccess(questions));
      } catch (message) {
        dispatch(actions.getFailed(message as string));
      }
    };

    if (evaluationId && domainId) fetchQuestions(evaluationId, domainId);
    
    // eslint-disable-next-line
  }, [evaluationId, domainId]);

  const flushQuestions = (): void => {
    dispatch(actions.questionsFlushed());
  }

  return { isLoading, questions, flushQuestions };
}
