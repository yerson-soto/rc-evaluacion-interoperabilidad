import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Typography } from "antd";
import { Box } from "library/components/Box";

import classnames from "classnames";
import classes from "./Sidenav.module.css";

import {
  SignalFilled,
  PieChartFilled,
  SnippetsFilled,
  AppstoreFilled,
  LoginOutlined,
  TeamOutlined,
  AppstoreOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { MenuItem } from "library/common/types";
import { paths } from '../../../library/common/constants';

interface SidenavProps {
  isCompacted: boolean;
  baseWidth: string | number;
  compactedWidth: string | number;

  onToggle: () => void;
  onLayoutChange: (isSmallDevice: boolean) => void;
  onCollapse: () => void;
}

export default function Sidenav(props: SidenavProps) {
  const navigate = useNavigate();
  const {
    isCompacted,
    baseWidth,
    compactedWidth,
    onToggle,
    onCollapse,
    onLayoutChange,
  } = props;

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
      getItem("Dashboard", "1", "/", <PieChartFilled />),
      getItem("Evaluaciones", "2", "/evaluaciones", <AppstoreFilled />),
      getItem("Dominios", "3", paths.domains.index, <SignalFilled />),
      getItem("Equipo", "sub2", "/", <TeamOutlined />, [
        getItem("Team 1", "6", "/"),
        getItem("Team 2", "8", "/"),
      ]),
      getItem("Iniciar Sesión", "9", paths.auth.login.reverse(), <LoginOutlined />),
    ];
  };

  const onBreakpoint = (broken: boolean): void => onLayoutChange(broken);

  const getClassNames = (): string =>
    classnames(classes.sidenav, {
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
        <Typography.Text className={classes.logoText}>Evaluaci&oacute;n</Typography.Text>
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
