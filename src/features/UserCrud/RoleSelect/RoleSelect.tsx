import React from "react";
import { Select } from "antd";
import { useTranslation } from 'react-i18next';
import { SelectProps, DefaultOptionType } from "antd/lib/select";
import { UserType } from 'library/common/enums';
import { roleLabels } from "library/common/constants";

export default React.forwardRef<any, SelectProps>((props, ref) => {
  const { t } = useTranslation();

  const options: DefaultOptionType[] = [
    { label: roleLabels[UserType.Admin], value: UserType.Admin },
    { label: roleLabels[UserType.Role2], value: UserType.Role2 },
    { label: roleLabels[UserType.Role3], value: UserType.Role3 },
  ];

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
