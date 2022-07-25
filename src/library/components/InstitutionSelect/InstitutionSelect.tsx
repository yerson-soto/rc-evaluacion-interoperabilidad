import React, { forwardRef } from "react";
import { Select } from "antd";
import { useInstitutionOptions } from "./useInstitutionOptions";
import { SelectProps, DefaultOptionType } from "antd/lib/select";
import { Organization } from "library/models/Organization";

interface CustomSelectProps extends SelectProps {
  onInstitutionChange?: (value: number, institutions: Organization[]) => void;
}

export default forwardRef<any, CustomSelectProps>((props, ref) => {
  const { isLoading, institutions, institutionOptions } = useInstitutionOptions();
  const { onInstitutionChange, onChange, ...extraProps } = props;

  const handleChange = (
    value: number,
    option: DefaultOptionType | DefaultOptionType[]
  ): void => {
    if (onChange) onChange(value, option);
    if (onInstitutionChange) onInstitutionChange(value, institutions);
  };

  return (
    <Select
      ref={ref}
      showSearch
      loading={isLoading}
      optionFilterProp="label"
      options={institutionOptions}
      onChange={handleChange}
      {...extraProps}
    />
  );
});
