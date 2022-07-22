import React, { forwardRef } from "react";
import { Select, SelectProps } from "antd";
import { useLevelOptions } from "./useLevelOptions";

export default forwardRef<any, SelectProps>((props, ref) => {
  const { isLoading, levelOptions } = useLevelOptions();

  return (
    <Select
      ref={ref}
      showSearch
      loading={isLoading}
      optionFilterProp="label"
      options={levelOptions}
      {...props}
    />
  );
});
