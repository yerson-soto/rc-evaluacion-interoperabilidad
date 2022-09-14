import React from "react";
import { useTranslation } from "react-i18next";
import { matchPath, useLocation } from "react-router-dom";
import { Layout, Menu, Popconfirm, Typography } from "antd";
import { AppstoreOutlined, LeftOutlined, LogoutOutlined } from "@ant-design/icons";
import { MenuItem } from "library/common/types";
import { keys } from "library/common/constants";
import { AppBox } from "library/components/AppBox";
import { useAppDispatch } from "redux/hooks";
import { logoutDone } from "redux/slices/authSlice";
import { useNavigationItems } from "library/hooks/useNavigationItems";

import classes from "./Sidenav.module.css";
import classnames from "classnames";

interface SidenavProps {
  isCompacted: boolean;
  baseWidth: string | number;
  compactedWidth: string | number;

  onToggle: () => void;
  onLayoutChange: (isSmallDevice: boolean) => void;
  onCollapse: () => void;
}

export default function Sidenav(props: SidenavProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navItems = useNavigationItems();
  const location = useLocation();

  const currentItem = navItems
    .find(navItem => matchPath(navItem.path, location.pathname) 
    || navItem.children?.some(child => matchPath(child.path, location.pathname)));
  
  const {
    isCompacted,
    baseWidth,
    compactedWidth,
    onToggle,
    onCollapse,
    onLayoutChange,
  } = props;

  const handleLogout = (): void => {
    localStorage.removeItem(keys.tokenLocalStorage);
    dispatch(logoutDone());
  };

  const handleBreakpoint = (broken: boolean): void => {
    onLayoutChange(broken);
  };

  const classNames = classnames(classes.sidenav, {
    [classes.closed]: isCompacted,
  });

  const sidenavItems: MenuItem[] = [
    ...navItems,
    {
      type: "divider",
      style: {
        borderColor: "#525252",
      },
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <Popconfirm
          placement="bottomLeft"
          title={t("alerts.logout_confirmation")}
          onConfirm={handleLogout}
          okText={t("buttons.yes")}
          cancelText={t("buttons.no")}
        >
          <a href="#">{t("nav.logout")}</a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Layout.Sider
      collapsible
      theme="dark"
      breakpoint="lg"
      trigger={null}
      width={baseWidth}
      collapsedWidth={compactedWidth}
      collapsed={isCompacted}
      onBreakpoint={handleBreakpoint}
      className={classNames}
    >
      <AppBox className={classes.logo}>
        <AppstoreOutlined className={classes.logoIcon} />
        <Typography.Text className={classes.logoText}>
          EMI
        </Typography.Text>
      </AppBox>
      <Menu
        className={classes.menu}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={currentItem ? [currentItem.path] : undefined}
        items={sidenavItems}
      />

      <AppBox onClick={onToggle} className={classes.trigger}>
        <LeftOutlined />
      </AppBox>
    </Layout.Sider>
  );
}
