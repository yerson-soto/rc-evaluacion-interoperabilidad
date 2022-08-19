import { useSearchParams } from "react-router-dom";
import { Domain } from "library/models/Domain";
import { keys } from 'library/common/constants';

export function useToggleQuestionary() {
  const [queryParams, setQueryParams] = useSearchParams();

  const domainId = queryParams.get(keys.domainParamName);
  const visible = Boolean(domainId);

  const open = (domain: Domain) => {
    const params = { [keys.domainParamName]: domain.id.toString() },
      options = { state: domain };

    setQueryParams(params, options);
  };

  const close = () => {
    setQueryParams({});
  };

  return { visible, open, close };
}
