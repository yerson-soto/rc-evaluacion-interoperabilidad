import React from "react";
import { Typography, Space } from "antd";
import { ReactComponent as Logo } from "resources/images/cupula.svg";

import classes from "./TitledLogo.module.css";

export default function TitledLogo() {
  return (
    <Space direction="vertical" size="middle" align="center">
      <Logo className={classes.logo} />
      <Typography.Title level={2} className={classes.title}>
        Interoperabilidad
      </Typography.Title>
    </Space>
  );
}
