import { useMemo } from "react";
import { OrganizationService } from 'library/api/services/OrganizationService';
import { useFetchList } from "library/hooks/useFetchList";
import { actions } from 'redux/slices/organizationSlice';
import { OrganizationMapper } from 'library/api/mappers/OrganizationMapper';
import { useAppSelector } from 'redux/hooks';

// Institutions no loading
export function useInstitutionOptions() {
  const { isLoading, results } = useAppSelector(state => state.organizations);

  useFetchList({
    service: OrganizationService,
    onStart: () => actions.setLoading(true),
    onSuccess: (institutions) => actions.getSuccess(institutions),
    onFailure: (message) => actions.getFailed(message) 
  })

  const institutionOptions = useMemo(() => {
    const organizationMapper = new OrganizationMapper();
    return results.map(organizationMapper.toSelectOption);
  }, [results]);

  return { isLoading, institutionOptions } ;
}