import React from "react";
import { Card, Space } from "antd";
import { AppBox } from "../AppBox";

import classes from "./Toolbar.module.css";

interface ToolbarProps {
  title: string;
  actions: React.ReactNode;
}

export default function Toolbar(props: ToolbarProps) {
  const { title, actions } = props;

  return (
    <Card>
      <AppBox className={classes.header}>
        <AppBox className={classes.title}>{title}</AppBox>

        <Space direction="horizontal">{actions}</Space>
      </AppBox>
    </Card>
  );
}
