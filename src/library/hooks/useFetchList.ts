import { useEffect } from "react";
import { ListRepository } from 'library/api/services/AbstractListService';

interface UseFetchListParams<T> {
  service: ListRepository<T>;
  onSuccess: (results: T[]) => void;
  onFailure: (message: string) => void;
  onStart?: () => void;
  onFinish?: () => void;
}

export function useFetchList<T>(params: UseFetchListParams<T>) {
  const { service, onSuccess, onFailure, onStart, onFinish } = params;

  useEffect(() => {
    const fetchResults = async () => {
      if (onStart) onStart();

      try {
        const results = await service.getAll();
        onSuccess(results);
      } catch (message) {
        onFailure(message as string);
      } finally {
        if (onFinish) onFinish();
      }
    };

    fetchResults();

    // eslint-disable-next-line
  }, []);
}
