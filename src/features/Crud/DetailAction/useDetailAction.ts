import { useState } from "react";
import { CrudRepository } from "library/api/services/AbstractCrudService";
import { ID } from "library/common/types";

interface DetailAction<T> {
  service: CrudRepository<T, any>;
}

type DetailState = "initial" | "loading" | "error";

export function useDetailAction<T>({ service }: DetailAction<T>) {
  const [status, setStatus] = useState<DetailState>("initial");
  const [record, setRecord] = useState<T | null>(null);

  const getById = async (id: ID): Promise<void> => {
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
  };

  return { record, status, getById };
}
