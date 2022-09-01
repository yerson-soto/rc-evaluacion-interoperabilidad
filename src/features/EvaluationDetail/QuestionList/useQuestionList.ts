import { useEffect } from "react";
import { CriterionService } from "library/api/services/CriterionService";
import { Question } from "library/models/Question";
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { actions } from 'redux/slices/questionSlice';

export function useQuestionList(domainId?: number) {
  const { isLoading, questionary: questions } = useAppSelector(state => state.questions);
  const criterionService = new CriterionService();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchQuestions = async (domain: number) => {
      dispatch(actions.startLoading())
      
      try {
        const criteria = await criterionService.getByDomain(domain);

        const questions: Question[] = criteria.map((criterion, key) => ({
          number: key + 1,
          criterion,
          choosenAnswer: null,
          answerEvidences: [],
          isCompleted: false
        }));

        dispatch(actions.getSuccess(questions));
      } catch (message) {
        dispatch(actions.getFailed(message as string));
      }
    };

    if (domainId) fetchQuestions(domainId);
    
    // eslint-disable-next-line
  }, [domainId]);

  const flushQuestions = (): void => {
    dispatch(actions.questionsFlushed());
  }

  return { isLoading, questions, flushQuestions };
}
