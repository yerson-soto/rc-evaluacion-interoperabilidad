import { useSearchParams, useLocation } from "react-router-dom";

import { LocationState } from "library/common/interfaces";

interface ToggleAction<T> {
  action: "detail" | "create" | "edit" | "delete";
  state?: T;
  keyFrom?: keyof T;
}

export function useToogleAction<T>({ action, state, keyFrom }: ToggleAction<T>) {
  const [params, setQueryParams] = useSearchParams();
  const { state: currentState, ...others } = useLocation() as LocationState<T>;

  console.log({...others, state: currentState });

  const checkIsOpen = (): boolean => {
    const actionMatch = action === params.get("action");
    
    if (keyFrom && state) {
      const stateMatch =
        !!currentState && state[keyFrom] === currentState[keyFrom];
      return stateMatch && actionMatch;
    } 

    return actionMatch;
  };

  const onOpen = (): void => {
    setQueryParams({ action }, { state });
  };

  const onCloseStart = (): void => {
    setQueryParams({}, { state });
  };

  const onCloseEnd = (): void => {
    setQueryParams({});
  };

  const isOpen = checkIsOpen();

  return { isOpen, onOpen, onCloseStart, onCloseEnd };
}
