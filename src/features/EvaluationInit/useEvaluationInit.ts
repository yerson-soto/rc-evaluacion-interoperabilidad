import React from "react";
import { useSearchParams } from "react-router-dom";
import { Domain } from "library/models/Domain";

export function useEvaluationInit() {
  const [queryParams, setQueryParams] = useSearchParams();

  const isOpen = Boolean(queryParams.get("dominio"));

  const openEvaluation = (domain: Domain) => {
    const params = { dominio: domain.slug },
      options = { state: domain };

    setQueryParams(params, options);
  };

  const closeEvaluation = () => setQueryParams({});

  return { isOpen, openEvaluation, closeEvaluation };
}
