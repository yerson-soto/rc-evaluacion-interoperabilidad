import { useMemo } from "react";

export interface OptionGroup<T> {
  id: number;
  name: string;
  options: T[];
}

interface Config<T> {
  options: T[];
  selectGroupId: (option: T) => number;
  selectGroupName: (option: T) => string;
}

export function useOptionGroup<T>({
  options,
  selectGroupId,
  selectGroupName,
}: Config<T>): OptionGroup<T>[] {
  const optionGroup = useMemo(() => {
    const groupOptions = (options: T[]) => {
      const groups: OptionGroup<T>[] = [];

      options.forEach((option) => {
        const existingGroup = groups.find(
          (group) => group.id === selectGroupId(option)
        );

        if (existingGroup) {
          existingGroup.options.push(option);
        } else {
          groups.push({
            id: selectGroupId(option),
            name: selectGroupName(option),
            options: [option],
          });
        }
      });

      return groups;
    };

    return groupOptions(options);
  }, [options]);

  return optionGroup;
}
