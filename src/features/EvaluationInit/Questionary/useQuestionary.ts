import { useState, useEffect } from "react";
import { CriterionService } from "library/api/services/CriterionService";
import { Question } from "library/models/Question";
import { ChangeLevel } from "library/api/dto/criterion-dto";

export function useQuestionary(domainId: number) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const criterionService = new CriterionService();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      try {
        const results = await criterionService.getByDomain(domainId);

        const questions: Question[] = results.map((result) => ({
          criterion: result,
          response: null,
          evidences: null,
        }));

        setQuestions(questions);
      } catch (message) {
        setQuestions([]);
      }

      setLoading(false);
    };

    fetchResults();

    // eslint-disable-next-line
  }, [domainId]);

  const changeResponse = (data: ChangeLevel) => {
    criterionService.changeLevel(data).then((choice) => {
      const questionIdx = questions.findIndex(
        (question) => question.criterion.id === data.criterionId
      );

      if (questionIdx !== -1) {
        const newQuestions = [...questions];
        newQuestions[questionIdx].response = choice;
        setQuestions(newQuestions);
      }
    });
  };

  return { isLoading, questions, changeResponse };
}
