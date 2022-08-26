import { useEffect } from "react";
import { CriterionService } from "library/api/services/CriterionService";
import { Question } from "library/models/Question";
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { actions } from 'redux/slices/questionSlice';

export function useQuestionary(domainId?: number) {
  const { isLoading, questionary, activeQuestion } = useAppSelector(state => state.questions);
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
          selectedAnswer: null,
          providedEvidences: [],
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


  const setActiveQuestion = (question: Question) => {
    dispatch(actions.questionPrevNext(question));
  }

  const flushQuestions = (): void => {
    dispatch(actions.questionsFlushed());
  }

  return { isLoading, questionary, activeQuestion, setActiveQuestion, flushQuestions };
}
