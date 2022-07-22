import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Header } from "./Header";
import { Sidenav } from "./Sidenav";
import { Main } from "./Main";
import { useAdminPanel } from './useAdminPanel';

import classes from "./AdminPanel.module.css";

// TODO: Set footer
export default function AdminPanel() {
  const {
    collapsed,
    contentOffset,
    siderWidth,
    collapsedWidth,
    onToggle,
    onCollapse,
    onLayoutChange
  } = useAdminPanel();

  return (
    <Layout hasSider className={classes.wrapper}>
      <Sidenav
        isCompacted={collapsed}
        baseWidth={siderWidth}
        compactedWidth={collapsedWidth}
        onToggle={onToggle}
        onCollapse={onCollapse}
        onLayoutChange={onLayoutChange}
      />
      <Layout className={classes.content} style={{ marginLeft: contentOffset }}>
        <Header onToggleSidenav={onToggle} />

        <Main><Outlet /></Main>
        {/* <Layout.Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Layout.Footer> */}
      </Layout>
    </Layout>
  );
}
