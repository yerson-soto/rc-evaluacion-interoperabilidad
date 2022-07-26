import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Popconfirm, Typography } from "antd";
import { Box } from "library/components/Box";

import {
  SignalFilled,
  PieChartFilled,
  AppstoreFilled,
  LoginOutlined,
  AlignLeftOutlined,
  AppstoreOutlined,
  CompressOutlined,
  LeftOutlined,
  FormOutlined,
  AimOutlined,
  LogoutOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MenuItem } from "library/common/types";
import { keys, paths } from "library/common/constants";

import classnames from "classnames";
import classes from "./Sidenav.module.css";
import { useAppDispatch } from "redux/hooks";
import { logoutDone } from "redux/slices/authSlice";

interface SidenavProps {
  isCompacted: boolean;
  baseWidth: string | number;
  compactedWidth: string | number;

  onToggle: () => void;
  onLayoutChange: (isSmallDevice: boolean) => void;
  onCollapse: () => void;
}

export default function Sidenav(props: SidenavProps) {
  const dispatch = useAppDispatch();

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
      getItem("Usuarios", "2", paths.management.users.index, <UsergroupAddOutlined />),
      getItem("Evaluaciones", "3", "/evaluaciones", <AppstoreFilled />),
      getItem("Dominios", "4", paths.management.domains.index, <AimOutlined />),
      getItem(
        "Lineamientos",
        "5",
        paths.management.lineaments.index,
        <AlignLeftOutlined />
      ),
      getItem("Criterios", "6", paths.management.criterions.index, <CompressOutlined />),
      getItem("Niveles", "7", paths.management.levels.index, <SignalFilled />),
      getItem("Respuestas", "8", paths.management.choices.index, <FormOutlined />),
      getItem("Evaluaciones (Crud)", "9", paths.management.evaluations.index, <FormOutlined />),
      getItem("Mi Cuenta", "10", paths.admin.settings.index, <SettingOutlined />),
      getItem(
        "Iniciar Sesión",
        "11",
        paths.auth.login.reverse(),
        <LoginOutlined />
      ),
      {
        key: "12",
        icon: <LogoutOutlined />,
        label: (
          <Popconfirm
            placement="bottomLeft"
            title="Deseas cerrar sesion?"
            onConfirm={() => {
              localStorage.removeItem(keys.tokenLocalStorage);
              dispatch(logoutDone());
            }}
            okText="Si"
            cancelText="No"
          >
            <a href="#">Cerrar Sesion</a>
          </Popconfirm>
        ),
      },
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
        <Typography.Text className={classes.logoText}>
          Evaluaci&oacute;n
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
