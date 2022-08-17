import { useSearchParams } from "react-router-dom";
import { Domain } from "library/models/Domain";

export function useToggleQuestionary() {
  const [queryParams, setQueryParams] = useSearchParams();

  const domainId = queryParams.get("dominio");
  const visible = Boolean(domainId);

  const open = (domain: Domain) => {
    const params = { dominio: domain.id.toString() },
      options = { state: domain };

    setQueryParams(params, options);
  };

  const close = () => {
    setQueryParams({});
  };

  return { visible, open, close };
}
