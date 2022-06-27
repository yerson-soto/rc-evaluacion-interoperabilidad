import { useState, useEffect } from "react";
import { Choice } from "library/models/Choice";
import { ChoiceService } from "main/services/ChoiceService";


export function useChoiceList(criterionId: number) {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      try {
        const choiceService = new ChoiceService();
        const choices = await choiceService.getByCriterion(criterionId);
        setChoices(choices);
      } catch (message) {
        setChoices([]);
      }

      setLoading(false);
    };

    fetchResults();

    // eslint-disable-next-line
  }, [criterionId]);

  return { isLoading, choices };
}