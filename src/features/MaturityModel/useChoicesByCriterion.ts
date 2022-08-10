import { useState, useEffect } from "react";
import { Choice } from "library/models/Choice";
import { ChoiceService } from "library/api/services/ChoiceService";


// TODO: Remove this
export function useChoicesByCriterion(criterionId: number) {
  const [choices, setChoices] = useState<Choice[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchChoices = async () => {
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

    fetchChoices();

    // eslint-disable-next-line
  }, [criterionId]);

  return { isLoading, choices };
}