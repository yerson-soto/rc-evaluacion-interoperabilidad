import { useSearchParams } from "react-router-dom";

export function useToggleParam(paramName: string) {
  const [queryParams, setQueryParams] = useSearchParams();

  const paramValue = queryParams.get(paramName);
  const visible = Boolean(paramValue);

  const getPrevParams = (): Record<string, string> => {
    const prevParams: Record<string, string> = {};

    queryParams.forEach((param, key) => {
      prevParams[key] = param;
    });

    return prevParams;
  };

  const setOpen = (value: string) => {
    const prevParams = getPrevParams();
    prevParams[paramName] = value;

    setQueryParams(prevParams);
  };

  const setClose = () => {
    const prevParams = getPrevParams();
    delete prevParams[paramName];

    setQueryParams(prevParams);
  };

  return { 
    visible, 
    paramValue, 
    queryParams,
    setQueryParams,
    setOpen, 
    setClose, 
    getPrevParams
  };
}
