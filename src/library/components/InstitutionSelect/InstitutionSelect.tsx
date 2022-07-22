import React, { forwardRef } from "react";
import { Select, SelectProps } from "antd";
import { useInstitutionOptions } from "./useInstitutionOptions";

export default forwardRef<any, SelectProps>((props, ref) => {
  const { isLoading, institutionOptions } = useInstitutionOptions();

  return (
    <Select
      ref={ref}
      showSearch
      loading={isLoading}
      optionFilterProp="label"
      options={institutionOptions}
      {...props}
    />
  );
});
