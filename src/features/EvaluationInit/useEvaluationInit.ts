import React from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Domain } from "library/models/Domain";
import { urls } from "../../library/common/constants";
import { LocationState } from "library/common/interfaces";

export function useEvaluationInit() {
  const [queryParams, setQueryParams] = useSearchParams();

  const isOpen = Boolean(queryParams.get("dominio"));

  const { state: domain } = useLocation() as LocationState<Domain>;

  const setOpen = (domain: Domain) => {
    const params = { dominio: domain.slug },
      options = { state: domain };

    setQueryParams(params, options);
  };

  const setClose = (keepDomain: Domain) => {
    setQueryParams({}, { state: keepDomain });
  };

  const afterClosed = () => {
    setQueryParams({});
  };

  return { isOpen, domain, setOpen, setClose, afterClosed };
}
