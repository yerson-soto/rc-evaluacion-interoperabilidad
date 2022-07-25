import { useMemo } from "react";
import { OrganizationService } from 'library/api/services/OrganizationService';
import { actions } from 'redux/slices/organizationSlice';
import { OrganizationMapper } from 'library/api/mappers/OrganizationMapper';
import { useLoadList } from 'library/hooks/useLoadList';

export function useInstitutionOptions() {
  const { isLoading, results: institutions } = useLoadList({
    selectLoading: (state) => state.organizations.isLoading,
    selectResults: (state) => state.organizations.institutions,
    service: new OrganizationService(),
    actions: {
      start: actions.startLoading,
      success: actions.getSuccess,
      failure: actions.getFailed,
    },
  });

  const institutionOptions = useMemo(() => {
    const organizationMapper = new OrganizationMapper();
    return institutions.map(organizationMapper.toSelectOption);
  }, [institutions]);

  return { isLoading, institutions, institutionOptions } ;
}