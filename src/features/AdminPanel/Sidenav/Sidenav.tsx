import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Layout, Menu, Typography } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Box } from "library/components/Box";
import classnames from "classnames";

import classes from "./Sidenav.module.css";

// Replace block Starts
import {
  BarChartOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  SlidersOutlined,
  AppstoreOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { MenuItem } from "library/common/types";


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
        getItem("Prueba 1", "3", "/"),
        getItem("Prueba 2", "4", "/"),
        getItem("Prueba 3", "5", "/"),
      ]),
      getItem("Equipo", "sub2", "/", <TeamOutlined />, [
        getItem("Team 1", "6", "/"),
        getItem("Team 2", "8", "/"),
      ]),
      getItem("Manual de Usuario", "9", "/", <FileOutlined />),
    ];
  };

  const onBreakpoint = (broken: boolean): void => onLayoutChange(broken);

  const getClassNames = (): string => classnames(classes.sidenav, {
    [classes.closed]: isCompacted,
  });

  return (
    <Layout.Sider
      collapsible
      theme="dark"
      breakpoint="lg"
      trigger={null}
      width={baseWidth}
      collapsedWidth={compactedWidth}
      collapsed={isCompacted}
      onBreakpoint={onBreakpoint}
      className={getClassNames()}
    >
      <Box className={classes.logo}>
        <AppstoreOutlined className={classes.logoIcon} />
        <Typography.Text className={classes.logoText}>
          Madurez
        </Typography.Text>
      </Box>
      <Menu
        className={classes.menu}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={getItems()}
      />

      <Box onClick={onToggle} className={classes.trigger}>
        <LeftOutlined />
      </Box>
    </Layout.Sider>
  );
}
