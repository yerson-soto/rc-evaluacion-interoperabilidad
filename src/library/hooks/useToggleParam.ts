import { useSearchParams } from "react-router-dom";

export function useToggleParam(paramName: string) {
  const [queryParams, setQueryParams] = useSearchParams();

  const paramValue = queryParams.get(paramName);
  const visible = Boolean(paramValue);

  const setOpen = (value: string) => {
    const params = { [paramName]: value };

    setQueryParams(params);
  };

  const setClose = () => {
    setQueryParams({});
  };

  return { visible, paramValue, setOpen, setClose };
}
