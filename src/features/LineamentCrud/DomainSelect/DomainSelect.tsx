import React, { forwardRef } from "react";
import { Select, SelectProps } from "antd";
import { useDomainOptions } from "./useDomainOptions";

export default forwardRef<any, SelectProps>((props, ref) => {
  const { isLoading, domainOptions } = useDomainOptions();

  return (
    <Select
      ref={ref}
      showSearch
      loading={isLoading}
      optionFilterProp="label"
      options={domainOptions}
      {...props}
    />
  );
});
