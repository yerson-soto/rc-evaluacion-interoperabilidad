import { useState, useEffect } from "react";
import { FullCriterion } from "library/models/Criterion";
import { CriterionService } from "library/api/services/CriterionService";


export function useCriteriaByDomain(domainId: number) {
  const [criterions, setCriterions] = useState<FullCriterion[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  // TODO: Remove duplicates call
  useEffect(() => {
    const fetchCriteria = async () => {
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

    fetchCriteria();

    // eslint-disable-next-line
  }, [domainId]);

  return { isLoading, criterions };
}