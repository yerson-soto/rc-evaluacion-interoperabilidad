import { useLocation } from "react-router-dom";

import { LocationState } from "library/common/interfaces";
import { keys } from '../common/constants';
import { useToggleParam } from 'library/hooks/useToggleParam';

interface ToggleAction<T> {
  action: "detail" | "create" | "edit" | "delete";
  state?: T;
  keyFrom?: keyof T;
}

export function useToogleAction<T>({ action, state, keyFrom }: ToggleAction<T>) {
  const { queryParams, setQueryParams, getPrevParams } = useToggleParam(keys.actionParamName);
  const { state: currentState } = useLocation() as LocationState<T>;

  const checkIsOpen = (): boolean => {
    const actionMatch = action === queryParams.get(keys.actionParamName);
 
    if (keyFrom && state) {
      const stateMatch =
        !!currentState && state[keyFrom] === currentState[keyFrom];
      return stateMatch && actionMatch;
    } 

    return actionMatch;
  };

  const removeActionParam = (
    params: Record<string, string>
  ): Record<string, string> => {
    params[keys.actionParamName] = action;
    delete params[keys.actionParamName];

    return params;
  }

  const onOpen = (): void => {
    const prevParams = getPrevParams();
    prevParams[keys.actionParamName] = action;
    setQueryParams(prevParams, { state });
  };

  const onCloseStart = (): void => {
    const newParams = removeActionParam(getPrevParams());
    setQueryParams(newParams, { state });
  };

  const onCloseEnd = (): void => {
    const newParams = removeActionParam(getPrevParams());
    setQueryParams(newParams);
  };

  const isOpen = checkIsOpen();

  return { isOpen, onOpen, onCloseStart, onCloseEnd };
}
