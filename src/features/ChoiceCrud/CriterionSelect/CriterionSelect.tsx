import React, { forwardRef } from "react";
import { Select, SelectProps } from "antd";
import { useCriterionOptions } from "./useCriterionOptions";

export default forwardRef<any, SelectProps>((props, ref) => {
  const { isLoading, criterionOptions } = useCriterionOptions();

  return (
    <Select
      ref={ref}
      showSearch
      loading={isLoading}
      optionFilterProp="label"
      options={criterionOptions}
      {...props}
    />
  );
});
