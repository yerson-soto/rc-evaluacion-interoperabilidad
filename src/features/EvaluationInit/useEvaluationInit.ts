import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Domain } from "library/models/Domain";
import { LocationState } from "library/common/interfaces";

type PageState = null | Domain;

export function useEvaluationInit() {
  const [queryParams, setQueryParams] = useSearchParams();

  const { state: currentDomain } = useLocation() as LocationState<PageState>;

  const isEvaluating = Boolean(queryParams.get("dominio"));

  const openEvaluation = (domain: Domain) => {
    const params = { dominio: domain.slug },
      options = { state: domain };

    setQueryParams(params, options);
  };

  const closeEvaluation = () => setQueryParams({});

  return {
    isEvaluating,
    currentDomain,

    openEvaluation,
    closeEvaluation,
  };
}
