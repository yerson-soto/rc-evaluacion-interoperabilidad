import React, { forwardRef } from "react";
import { Select, SelectProps } from "antd";
import { useManagerOptions } from "./useManagerOptions";

export default forwardRef<any, SelectProps>((props, ref) => {
  const { isLoading, managerOptions } = useManagerOptions();

  return (
    <Select
      ref={ref}
      showSearch
      loading={isLoading}
      optionFilterProp="label"
      options={managerOptions}
      {...props}
    />
  );
});
