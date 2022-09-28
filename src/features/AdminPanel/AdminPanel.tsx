import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Header } from "./Header";
import { Sidenav } from "./Sidenav";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { useAdminPanel } from './useAdminPanel';

import classes from "./AdminPanel.module.css";

// TODO: Set footer
export default function AdminPanel() {
  const {
    overlayed,
    collapsed,
    contentOffset,
    siderWidth,
    collapsedWidth,
    onToggle,
    onCollapse,
    onLayoutChange
  } = useAdminPanel();

  return (
    <Layout
      className={classes.wrapper}
      hasSider
    >
      <Sidenav
        isCompacted={collapsed}
        baseWidth={siderWidth}
        showBackdrop={overlayed}
        compactedWidth={collapsedWidth}
        onToggle={onToggle}
        onCollapse={onCollapse}
        onLayoutChange={onLayoutChange}
      />
      <Layout 
        className={classes.content} 
        style={{ marginLeft: contentOffset }}
      >
        <Header onToggleSidenav={onToggle} />

        <Main><Outlet /></Main>

        {/* <Footer /> */}
      </Layout>
    </Layout>
  );
}
