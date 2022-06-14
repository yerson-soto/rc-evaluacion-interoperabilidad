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
  const contentOffset = broken
    ? "0"
    : collapsed
    ? "var(--sider-collapsed-w)"
    : siderWidth;

  React.useEffect(() => {
    function adjustSidebar() {
      if (!broken) setCollapsed(false);
    }

    adjustSidebar();
  }, [broken]);

  const onChangeCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleToggle = (): void => setCollapsed(!collapsed);
  const handleCollapse = (): void => setCollapsed(true);
  const handleLayoutChange = (broken: boolean): void => setBroken(broken);

  return (
    <Layout hasSider className={classes.wrapper}>
      <Sidenav
        isCompacted={collapsed}
        baseWidth={siderWidth}
        compactedWidth={collapsedWidth}
        onToggle={handleToggle}
        onCollapse={handleCollapse}
        onLayoutChange={handleLayoutChange}
      />
      <Layout
        className={classes.content}
        style={{ marginLeft: contentOffset }}
      >
        <Header onToggleSidenav={onChangeCollapsed} />
        <Main>
          <Outlet />
        </Main>
        {/* <Layout.Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Layout.Footer> */}
      </Layout>
    </Layout>
  );
}
