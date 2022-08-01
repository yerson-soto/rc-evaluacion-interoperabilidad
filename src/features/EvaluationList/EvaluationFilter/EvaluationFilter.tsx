import React from "react";
import { Card, Input, Select } from "antd";
import classes from "./EvaluationFilter.module.css";

interface EvaluationFilterProps {
  onSearch: (value: string) => Promise<void>;
  // onFilter: () => Promise<void>;

}

export default function EvaluationFilter(props: EvaluationFilterProps) {
  const { onSearch } = props;
  
  return (
    <Card bodyStyle={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: '10px'
    }}>
      <Select
        // size="large"
        defaultValue="jack"
        style={{ width: 180 }}
        onChange={console.log}
      >
        <Select.Option value="jack">COMPLETADA</Select.Option>
        <Select.Option value="lucy">PENDIENTE</Select.Option>
        <Select.Option value="disabled" disabled>
          Disabled
        </Select.Option>
        <Select.Option value="Yiminghe">CREADA</Select.Option>
      </Select>

      <Select
        // size="large"
        defaultValue="lucy"
        style={{ width: 180, marginRight: 'auto' }}
        onChange={console.log}
      >
        <Select.Option value="jack">Codigo</Select.Option>
        <Select.Option value="lucy">Nombre</Select.Option>
        <Select.Option value="disabled" disabled>
          Disabled
        </Select.Option>
        <Select.Option value="Yiminghe">CREADA</Select.Option>
      </Select>

      <Input.Search
        // size="large"
        style={{ marginLeft: "auto", maxWidth: 300 }}
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
      />
    </Card>
  );
}
