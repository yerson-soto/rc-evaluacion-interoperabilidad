import { useState } from "react";
import { Organization } from "library/models/Organization";
import { OrganizationService } from "library/api/services/OrganizationService";
import { useFetchList } from 'library/hooks/useFetchList';

export function useOrganizationList() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useFetchList({
    service: OrganizationService,
    onStart: () => setLoading(true),
    onFinish: () => setLoading(false),
    onSuccess: setOrganizations,
    onFailure: () => {} 
  })

  return { isLoading, organizations };
}
