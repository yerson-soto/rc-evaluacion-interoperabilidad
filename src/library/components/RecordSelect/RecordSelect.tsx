import React from "react";
import { Select } from "antd";
import { SelectProps, DefaultOptionType } from "antd/lib/select";

interface RecordSelectProps extends SelectProps {
  records: Record<string | number, string>;
}

export default React.forwardRef<any, RecordSelectProps>((props, ref) => {
  const { records, ...selectProps } = props;

  const options: DefaultOptionType[] = Object.keys(records).map(
    (key) => ({
      label: records[key],
      value: key,
    })
  );

  return <Select ref={ref} options={options} {...selectProps} />;
});
