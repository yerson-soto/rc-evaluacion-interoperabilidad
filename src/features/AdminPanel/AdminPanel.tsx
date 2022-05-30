import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Header } from "./Header";
import { Sidenav } from "./Sidenav";
import { Main } from "./Main";

import classes from "./AdminPanel.module.css";

export default function AdminPanel() {
  const [collapsed, setCollapsed] = React.useState(true);
  const [broken, setBroken] = React.useState(true);

  const siderWidth = "var(--sider-w)";
  const collapsedWidth = broken ? "0" : "var(--sider-collapsed-w)";
  const contentOffset = broken ? "0" : collapsed ? "var(--sider-collapsed-w)" : siderWidth;

  React.useEffect(() => {
    function adjustSidebar() {
      if (!broken) setCollapsed(false);
    }

    adjustSidebar();
  }, [broken]);

  const onChangeCollapsed = () => {
    setCollapsed(!collapsed);
  }

  const onChangeBroken = (isBroken: boolean) => {
    setBroken(isBroken);
  }

  return (
    <Layout hasSider className={classes.wrapper}>
      <Sidenav
        isCompacted={collapsed}
        baseWidth={siderWidth}
        compactedWidth={collapsedWidth}
        onToggle={onChangeCollapsed}
        onLayoutChange={onChangeBroken}
      />
      <Layout
        style={{
          marginLeft: contentOffset,
          transition: "all .2s",
        }}
      >
        <Header onToggleSidenav={onChangeCollapsed} />
        <Main><Outlet /></Main>
        <Layout.Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}
