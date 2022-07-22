import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectProps } from "antd";
import { useLineamentOptions } from "./useLineamentOptions";

interface CustomSelectProps extends SelectProps {
  onChangeLineaments: (values: number[]) => void;
}

export default forwardRef<any, CustomSelectProps>((props, ref) => {
  const { t } = useTranslation();
  const { isLoading, lineamentOptions, handleChange } = useLineamentOptions();
  const { onChangeLineaments, onChange, ...selectProps } = props;

  const customOnChange = (values: number[]) =>
    handleChange(values, onChangeLineaments);

  return (
    <Select
      showSearch
      ref={ref}
      loading={isLoading}
      optionFilterProp="children"
      onChange={customOnChange}
      {...selectProps}
    >
      {lineamentOptions.map((group) => (
        <Select.OptGroup
          key={group.id}
          label={`${t("preffixes.domain")} ${group.name}`}
        >
          {group.options.map((option) => (
            <Select.Option key={option.id} value={option.id}>
              {option.nomenclature}
            </Select.Option>
          ))}
        </Select.OptGroup>
      ))}
    </Select>
  );
});
