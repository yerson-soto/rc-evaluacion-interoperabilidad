import { useMemo } from "react";
import { OrganizationMapper } from "library/api/mappers/OrganizationMapper";
import { useAppSelector } from "redux/hooks";

export function useInstitutionOptions() {
  const { isLoading, results: organizations } = useAppSelector(
    (state) => state.organizations
  );

  const orgOptions = useMemo(() => {
    const orgMapper = new OrganizationMapper();
    const orgOptions = organizations.map(orgMapper.toSelectOption);

    return orgOptions;
  }, [organizations]);

  return { isLoading, orgOptions };
}
