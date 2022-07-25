import { useState } from "react";
import { Domain } from "library/models/Domain";
import { DomainService } from "library/api/services/DomainService";
import { useFetchList } from 'library/hooks/useFetchList';

export function useDomainList() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useFetchList({
    service: new DomainService(),
    onStart: () => setLoading(true),
    onFinish: () => setLoading(false),
    onSuccess: setDomains,
    onFailure: () => {} 
  })

  return { isLoading, domains };
}
