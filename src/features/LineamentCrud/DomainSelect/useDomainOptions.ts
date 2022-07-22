import { useMemo } from "react";
import { useListAction } from "features/Crud/useListAction";
import { domainSlice } from "redux/slices/domainSlice";
import { DomainService } from "library/api/services/DomainService";
import { Domain } from "library/models/Domain";
import { DomainMapper } from 'library/api/mappers/DomainMapper';

export function useDomainOptions() {
  const domainService = new DomainService();

  const { isLoading, results: domains } = useListAction<Domain>({
    selectLoading: (state) => state.domains.isLoading,
    selectResults: (state) => state.domains.results,
    reducer: domainSlice,
    service: domainService,
  });

  const domainOptions = useMemo(() => {
    const domainMapper = new DomainMapper();
    return domains.map(domainMapper.toSelectOption);
  }, [domains]);

  return { isLoading, domainOptions } ;
}