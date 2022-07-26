import React from "react";
import { Select } from "antd";
import { SelectProps, DefaultOptionType } from "antd/lib/select";
import { UserType } from "library/common/enums";
import { roleLabels } from "library/common/constants";

export default React.forwardRef<any, SelectProps>((props, ref) => {

  const options: DefaultOptionType[] = Object.keys(roleLabels).map(
    (key: unknown) => ({
      label: roleLabels[key as UserType],
      value: Number(key),
    })
  );

  return (
    <Select
      ref={ref}
      showSearch
      optionFilterProp="label"
      options={options}
      {...props}
    />
  );
});
