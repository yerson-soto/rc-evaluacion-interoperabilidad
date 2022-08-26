import React, { useEffect } from "react";
import { Domain } from "library/models/Domain";
import { useDetailAction } from "features/Crud/DetailAction/useDetailAction";
import { useSearchParams } from "react-router-dom";
import { DomainService } from "library/api/services/DomainService";
import { useTranslation } from "react-i18next";
import { keys } from 'library/common/constants';

export function useDomain() {
  const [queryParams] = useSearchParams();
  const domainId = queryParams.get(keys.domainParamName);

  const { t } = useTranslation();

  const domainService = new DomainService();

  const { record: domain, status, getById, flush } = useDetailAction<Domain>({
    service: domainService,
    defaultLoading: true
  });

  useEffect(() => {
    if (domainId) getById(domainId);
  }, [domainId]);

  const domainName = domain ? domain.name : t("labels.not_found");
  const domainTitle = status === "loading"
        ? `${t("loading.text")}...`
        : `${t("labels.domain")} ${domainName}`;

  return { 
    isFetching: status === "loading", 
    isError: status === "error", 
    domain, 
    domainTitle,
    flushDomain: flush
  };

}
