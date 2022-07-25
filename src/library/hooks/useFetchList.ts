import { useEffect } from "react";
import { CommonRepository } from "library/api/repositories/CommonRepository";

interface UseFetchListParams<T> {
  service: CommonRepository<T>;
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
