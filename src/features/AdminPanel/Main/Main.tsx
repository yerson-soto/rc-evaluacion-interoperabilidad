import React from "react";
import { Breadcrumb, Layout } from "antd";

import classes from "./Main.module.css";

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <Layout.Content className={classes.main}>
      <Breadcrumb className={classes.breadcrumb}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb>

      {children}
    </Layout.Content>
  );
}
