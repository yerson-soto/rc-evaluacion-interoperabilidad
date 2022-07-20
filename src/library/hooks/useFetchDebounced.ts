import { useDebouncedCallback } from "use-debounce";

export function useFetchDebounced<T extends (...args: any[]) => ReturnType<T>>(
  func: T,
  wait: number = 1000
) {
  const debouncedFunc = useDebouncedCallback(func, wait, {
    leading: true,
    trailing: false,
  });

  return debouncedFunc;
}
