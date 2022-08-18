import { useState } from "react";
import { CrudRepository } from "library/api/services/AbstractCrudService";
import { useFetchDebounced } from 'library/hooks/useFetchDebounced';
import { ID } from "library/common/types";

interface DetailAction<T> {
  service: CrudRepository<T, any>;
  defaultLoading?: boolean;
}

type DetailState = "initial" | "loading" | "error";

export function useDetailAction<T>({ service, defaultLoading }: DetailAction<T>) {
  const defaultStatus: DetailState = defaultLoading ? "loading" : "initial";
  const [status, setStatus] = useState<DetailState>(defaultStatus);
  const [record, setRecord] = useState<T | null>(null);

  const getById = useFetchDebounced(async (id: ID): Promise<void> => {
    setStatus("loading");

    await service
      .getById(id)
      .then((record) => {
        setRecord(record);
        setStatus("initial");
      })
      .catch(() => {
        setRecord(null);
        setStatus("error");
      })      
  });

  const flush = (): void => {
    setRecord(null);
    setStatus("initial");
  }

  return { record, status, getById, flush };
}
