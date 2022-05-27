import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

import classes from "./AdminPanel.module.css";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export default function AdminPanel() {
  const [collapsed, setCollapsed] = useState(true);
  const [broken, setBroken] = useState(true);

  const siderWidth = "var(--sider-w)";
  const collapsedWidth = broken ? "0" : "var(--sider-collapsed-w)";
  const contentOffset = broken
    ? "0"
    : collapsed
    ? "var(--sider-collapsed-w)"
    : siderWidth;
  console.log("broken", broken, collapsed);
  console.log("offset", contentOffset);

  useEffect(() => {
    function adjustSidebar() {
      if (!broken) setCollapsed(false);
    }

    adjustSidebar();
  }, [broken]);

  return (
    <Layout hasSider className={classes.wrapper}>
      <Layout.Sider
        collapsible
        theme="dark"
        breakpoint="lg"
        trigger={null}
        className={classes.sidebar}
        width={siderWidth}
        collapsedWidth={collapsedWidth}
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          setBroken(broken);
        }}
      >
        <div className={classes.logo}>
          <MenuOutlined
            className={classes.trigger}
            style={{ color: "#ffffff" }}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Layout.Sider>
      <Layout
        style={{
          marginLeft: contentOffset,
          transition: "all .2s",
        }}
      >
        <Layout.Header className={classes.background} style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: classes.trigger,
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Layout.Header>

        <Layout.Content
          className={classes.background}
          style={{
            height: "auto",
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "initial",
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
            <p>5</p>
          </div>
        </Layout.Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
}
// export default function AdminPanel() {
//   return (
//     <div className={classes.panel}>
//       <Sidebar />

//       <div className={classes.content}>
//         <Header />

//         <Main>
//           <Outlet />
//         </Main>
//       </div>
//     </div>
//   );
// }
