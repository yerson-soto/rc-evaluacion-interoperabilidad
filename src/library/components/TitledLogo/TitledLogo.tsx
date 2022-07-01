import React from "react";
import { Typography, Space } from "antd";
import { ReactComponent as Logo } from "resources/images/ant-design.svg";

import classes from "./TitledLogo.module.css";

export default function TitledLogo() {
  return (
    <Space size="middle">
      <Logo className={classes.logo} />
      <Typography.Title style={{ margin: 0 }} level={2}>
        Ant Design
      </Typography.Title>
    </Space>
  );
}
