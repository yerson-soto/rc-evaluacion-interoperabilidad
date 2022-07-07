import { useState, useEffect } from "react";
import { Criterion } from "library/models/Criterion";
import { CriterionService } from "library/api/services/CriterionService";


export function useCriterionList(domainId: number) {
  const [criterions, setCriterions] = useState<Criterion[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);

      try {
        const service = new CriterionService();
        const results = await service.getByDomain(domainId);
        setCriterions(results);
      } catch (message) {
        setCriterions([]);
      }

      setLoading(false);
    };

    fetchResults();

    // eslint-disable-next-line
  }, [domainId]);

  return { isLoading, criterions };
}