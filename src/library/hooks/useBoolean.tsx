import { useState } from 'react';

export function useBoolean(defaultValue: boolean = false) {
  const [value, setValue] = useState(defaultValue);

  const on = () => setValue(true);
  const off = () => setValue(false);

  return { on, off, value };
}