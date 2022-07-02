import React from "react";
import { Typography, Space } from "antd";
import { ReactComponent as Logo } from "resources/images/ant-design.svg";

import classes from "./TitledLogo.module.css";

export default function TitledLogo() {
  return (
    <Space direction="vertical" size="middle" align="center">
      <Logo className={classes.logo} />
      <Typography.Title className={classes.title} level={2}>
        Ant Design
      </Typography.Title>
    </Space>
  );
}
