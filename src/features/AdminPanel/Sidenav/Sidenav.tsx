import React, { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Layout, Menu, Popconfirm, Typography } from "antd";
import { AppstoreOutlined, LeftOutlined, LogoutOutlined } from "@ant-design/icons";
import { MenuItem } from "library/common/types";
import { keys } from "library/common/constants";
import { AppBox } from "library/components/AppBox";
import { useAppDispatch } from "redux/hooks";
import { logoutDone } from "redux/slices/authSlice";
import { CSSTransition } from 'react-transition-group';
import { useSidenav } from './useSidenav';
import { MenuProps } from 'antd/lib/menu';

import classes from "./Sidenav.module.css";
import classnames from "classnames";

interface SidenavProps {
  isCompacted: boolean;
  showBackdrop: boolean;
  baseWidth: string | number;
  compactedWidth: string | number;

  onToggle: () => void;
  onLayoutChange: (isSmallDevice: boolean) => void;
  onCollapse: () => void;
}

export default function Sidenav(props: SidenavProps) {
  const dispatch = useAppDispatch();
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { navItems, activeKey, openedKeys } = useSidenav();

  const {
    showBackdrop,
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

  const handleMenuClick: MenuProps["onClick"] = ({ key }): void => {
    const customKeys = ["logout"];
    const isCustomKey = customKeys.includes(key);

    if (!isCustomKey) navigate(key);
    if (showBackdrop) onCollapse();
  }
  
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
    <React.Fragment>
      <CSSTransition
        in={showBackdrop}
        nodeRef={nodeRef}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        <AppBox 
          className={classes.backdrop} 
          onClick={onCollapse} 
        />
      </CSSTransition>
      
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
          selectedKeys={activeKey ? [activeKey] : undefined}
          // defaultOpenKeys={!isCompacted ? openedKeys : []}
          items={sidenavItems}
          onClick={handleMenuClick}
        />

        <AppBox onClick={onToggle} className={classes.trigger}>
          <LeftOutlined />
        </AppBox>
      </Layout.Sider>
    </React.Fragment>
  );
}
