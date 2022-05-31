import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Layout, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import classes from "./Sidenav.module.css";

// Replace block Starts
import {
  BarChartOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  SlidersOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   href: string,
//   icon?: React.ReactNode,
//   children?: MenuItem[]
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     onClick: () =>
//       label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem("Dashboard", "1", "/", <PieChartOutlined />),
//   getItem("Evaluaciones", "2", "/evaluaciones", <BarChartOutlined />),
//   getItem("Medición", "sub1", "/", <SlidersOutlined />, [
//     getItem("Tom", "3", "/",),
//     getItem("Bill", "4", "/",),
//     getItem("Alex", "5", "/",),
//   ]),
//   getItem("Team", "sub2", "/", <TeamOutlined />, [
//     getItem("Team 1", "6", "/",),
//     getItem("Team 2", "8", "/",),
//   ]),
//   getItem("Files", "9", "/", <FileOutlined />),
// ];
// Replace block ends

interface SidenavProps {
  isCompacted: boolean;
  baseWidth: string | number;
  compactedWidth: string | number;

  onToggle: () => void;
  onLayoutChange: (isSmallDevice: boolean) => void;
}

export default function Sidenav(props: SidenavProps) {
  const navigate = useNavigate();
  const { isCompacted, baseWidth, compactedWidth, onToggle, onLayoutChange } =
    props;

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    href: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      onClick: () => navigate(href),
      label,
    } as MenuItem;
  };

  const getItems = (): MenuItem[] => {
    return [
      getItem("Dashboard", "1", "/", <PieChartOutlined />),
      getItem("Evaluaciones", "2", "/evaluaciones", <BarChartOutlined />),
      getItem("Medición", "sub1", "/", <SlidersOutlined />, [
        getItem("Tom", "3", "/"),
        getItem("Bill", "4", "/"),
        getItem("Alex", "5", "/"),
      ]),
      getItem("Team", "sub2", "/", <TeamOutlined />, [
        getItem("Team 1", "6", "/"),
        getItem("Team 2", "8", "/"),
      ]),
      getItem("Files", "9", "/", <FileOutlined />),
    ];
  };

  return (
    <Layout.Sider
      collapsible
      theme="dark"
      breakpoint="lg"
      trigger={null}
      className={classes.sidenav}
      width={baseWidth}
      collapsedWidth={compactedWidth}
      collapsed={isCompacted}
      onBreakpoint={(broken) => {
        onLayoutChange(broken);
      }}
    >
      <div className={classes.logo}>
        {/* <MenuOutlined
          className={classes.trigger}
          style={{ color: "#ffffff" }}
          onClick={onToggle}
        /> */}
      </div>
      <Menu
        className={classes.menu}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={getItems()}
      />

      <RightOutlined
        className={`${classes.trigger} ${isCompacted && 'open'}`}
      />
    </Layout.Sider>
  );
}
